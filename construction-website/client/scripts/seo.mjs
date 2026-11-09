// Runs before every build. Writes robots.txt and sitemap.xml using the real site address.
import { writeFileSync, mkdirSync } from 'node:fs';
import { services } from '../src/config/content.js';
const host = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
const base = host.replace(/\/$/, '');
const paths = ['/', '/about', '/services', ...services.map((s) => `/services/${s.slug}`), '/projects', '/process', '/why', '/founder', '/supervisor', '/faq', '/contact', '/quote', '/privacy', '/terms'];
mkdirSync('public', { recursive: true });
writeFileSync('public/robots.txt', ['User-agent: *', 'Allow: /', 'Disallow: /admin', base ? `Sitemap: ${base}/sitemap.xml` : ''].filter(Boolean).join('\n') + '\n');
if (base) {
  writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${base}${p === '/' ? '' : p}</loc></url>`).join('\n')}\n</urlset>\n`);
  console.log(`SEO files written for ${base}`);
} else console.warn('SITE_URL is not set: sitemap.xml was not generated. Set SITE_URL (for example https://www.example.co.za) before launch.');
