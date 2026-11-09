import { Router } from 'express';
import { z } from 'zod';
import crypto from 'node:crypto';
import { db } from './db.js';
import { send, layout, company, emailConfigured } from './mailer.js';
const s = (min, max) => z.string().trim().min(min).max(max);
const opt = (max) => z.string().trim().max(max).optional().or(z.literal(''));
const contact = z.object({ name: s(2, 100), email: z.string().trim().email().max(150), phone: opt(30), subject: s(2, 150), message: s(10, 3000), website: opt(200) });
const quote = z.object({ name: s(2, 100), email: z.string().trim().email().max(150), phone: s(7, 30), projectType: s(2, 100),
  sector: z.enum(['Residential', 'Commercial']), location: s(2, 150), budget: opt(60), startDate: opt(20), description: s(10, 3000), website: opt(200) });
const ref = (p) => `${p}-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
export const router = Router();

async function handle(req, res, next, { schema, kind, prefix, toRows, toData, titles }) {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Please check the form. ' + parsed.error.issues.map((i) => `${i.path[0]}: ${i.message}`).join('; ') });
    const d = parsed.data;
    if (d.website) return res.json({ reference: ref(prefix) }); // honeypot: bots
    if (!emailConfigured()) return res.status(503).json({ error: 'Our enquiry system is not available right now. Please contact us directly.' });
    const reference = ref(prefix);
    let enquiry = null;
    if (db) enquiry = await db.enquiry.create({ data: { reference, kind, ...toData(d) } });
    const rows = [['Reference', reference], ...toRows(d)];
    try {
      await send({ to: process.env.COMPANY_EMAIL, subject: `${titles.company} ${reference}`, html: layout(titles.company, rows), replyTo: d.email, enquiryId: enquiry?.id });
    } catch (e) {
      console.error('Company email failed:', e.message);
      return res.status(502).json({ error: 'We could not send your message. Please try again shortly or contact us directly.' });
    }
    send({ to: d.email, subject: `${titles.customer} (${reference})`, enquiryId: enquiry?.id,
      html: layout(titles.customer, [['Reference', reference], ...toRows(d)], `Thank you, ${d.name}. We have received your request and will be in touch. Please quote your reference in any follow-up.`) })
      .catch((e) => console.error('Customer email failed:', e.message));
    res.json({ reference });
  } catch (e) { next(e); }
}
router.post('/contact', (req, res, next) => handle(req, res, next, { schema: contact, kind: 'CONTACT', prefix: 'ENQ',
  titles: { company: 'New contact enquiry', customer: `We received your enquiry` },
  toRows: (d) => [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Subject', d.subject], ['Message', d.message]],
  toData: (d) => ({ name: d.name, email: d.email, phone: d.phone || null, subject: d.subject, message: d.message }) }));
router.post('/quote', (req, res, next) => handle(req, res, next, { schema: quote, kind: 'QUOTE', prefix: 'QUO',
  titles: { company: 'New quotation request', customer: 'We received your quotation request' },
  toRows: (d) => [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Project type', d.projectType], ['Sector', d.sector], ['Location', d.location], ['Budget', d.budget], ['Start date', d.startDate], ['Description', d.description]],
  toData: (d) => ({ name: d.name, email: d.email, phone: d.phone, projectType: d.projectType, sector: d.sector, location: d.location, budget: d.budget || null, startDate: d.startDate || null, message: d.description }) }));
