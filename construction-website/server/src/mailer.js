import nodemailer from 'nodemailer';
import { db } from './db.js';
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const company = () => process.env.COMPANY_NAME || 'Our company';
export const emailConfigured = () => ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'COMPANY_EMAIL'].every((k) => process.env[k]);
let transport;
const getTransport = () => transport ||= nodemailer.createTransport({
  host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
export function layout(title, rows, intro = '') {
  const body = rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:8px 12px;color:#777;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`).join('');
  return `<div style="font-family:Arial,sans-serif;background:#F5F4F0;padding:24px"><div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden">
  <div style="background:#111;color:#F5F4F0;padding:20px 24px;font-size:18px">${esc(company())}</div>
  <div style="padding:24px;color:#111"><h2 style="margin:0 0 12px;font-size:20px">${esc(title)}</h2>${intro ? `<p style="line-height:1.5">${esc(intro)}</p>` : ''}
  <table style="border-collapse:collapse;width:100%;font-size:15px">${body}</table></div></div></div>`;
}
export async function send({ to, subject, html, replyTo, enquiryId }) {
  let ok = true, error = null;
  try { await getTransport().sendMail({ from: process.env.MAIL_FROM || `"${company()}" <${process.env.SMTP_USER}>`, to, subject, html, replyTo }); }
  catch (e) { ok = false; error = e.message; }
  try { if (db) await db.emailLog.create({ data: { enquiryId: enquiryId || null, toAddress: to, subject, ok, error } }); } catch {}
  if (!ok) throw new Error(error);
}
