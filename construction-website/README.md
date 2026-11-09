# Construction company website

A premium, Apple-inspired construction website: React (Vite) front end, Express API, optional PostgreSQL (Supabase works), real email via SMTP.

Version 0.4. Updated every build. Read "Status" first.

---------------------------------------------------------------------

## 1. Status (what is built, what is not)

BUILT AND IN THIS REPO
- Public pages: Home, About, Services (+ one detail page per service), Projects (+ detail template), Our Process, Why Choose Us, Founder, Supervisor, FAQ, Contact, Request a Quote, Privacy Policy, Terms and Conditions, custom 404.
- Navigation: desktop bar with "Our Team" dropdown, and a rebuilt mobile menu (see changelog).
- Contact and Quote forms: validated, spam-protected, send a real email to the company and a confirmation to the customer. They show an error (never fake success) if email is not configured.
- API: Express, Helmet, rate limiting, server-side validation (zod), optional database storage via Prisma.
- SEO: page titles and descriptions per page, robots.txt and sitemap.xml generated at build time.
- Vercel and Supabase deployment files (vercel.json, api/index.js).

NOT BUILT YET (next phases)
- Admin dashboard (login, manage services/projects/FAQs/profiles, view enquiries)
- Quotation and invoice builder, PDF generation, emailing them
- Photo upload (quote form attachment, founder/supervisor photos, project photos)
- Automated tests (component, API, end-to-end)
- Real photography (all images are labelled illustrations or placeholders)

NEEDS REAL COMPANY INFORMATION BEFORE LAUNCH
- Company name, logo, email, phone, WhatsApp number, address (client/src/config/site.js)
- Confirmed service list (client/src/config/content.js)
- Founder and supervisor details and photos
- Real projects (client/src/config/projects.js)
- Privacy Policy and Terms: fill every [square bracket] and have a lawyer review (client/src/pages/Legal.jsx)

NOT TESTED BY THE ASSISTANT (it has no internet or browser)
Everything below was written and syntax-checked but must be tested by you: email delivery, database saving, Vercel deployment, mobile menu on real phones. Report any problem and it will be fixed.

---------------------------------------------------------------------

## 2. Changelog

### 0.4
- FIXED: page "lazy load / flash" when clicking the navigation. Causes removed: (1) scroll position was reset after the new page painted, causing a visible jump. It is now reset before paint. (2) Font loaded from Google caused text to re-render. Inter is now bundled with the site. (3) Pages are loaded together, not on demand.
- REBUILT: mobile hamburger menu. Separate full-screen sheet, animated two-line icon, locks the page without shifting it (works on iPhone Safari), closes on link tap, Escape, or when the screen becomes wide, uses dynamic viewport height so it fits phones with moving browser bars, respects reduced-motion.
- ADDED: Vercel deployment files, Supabase instructions, per-page titles, robots.txt and sitemap.xml generation.
- CHANGED: the server now lives behind one root package.json. Run `npm install` in the project root and in client/ (see section 3). The old server/package.json and server/.env.example were removed. The .env file now sits in the project ROOT.

### 0.3
- Fixed blank flash and ghosted text (removed blur header and lazy loading). Added Contact and Quote forms, API, email, Privacy Policy and Terms rewrite.

### 0.2
- Added all informational pages with draft content and illustrative visuals.

### 0.1
- Design system, navigation, footer, Home page.

---------------------------------------------------------------------

## 3. Run it on your computer

You need Node.js 18 or newer (nodejs.org, LTS).

First time, or after updating from an older version:

    cd construction-website
    npm install
    cd client
    npm install
    cd ..

Create your settings file in the PROJECT ROOT (same folder as package.json):

    copy .env.example .env          (Windows)
    cp .env.example .env            (Mac/Linux)

Open .env and set at least COMPANY_EMAIL and the SMTP_ values (section 5).

Run two terminals:

    Terminal 1 (API):       npm run server
    Terminal 2 (website):   cd client
                            npm run dev

Open http://localhost:5173. Check the API at http://localhost:4000/api/health. It should show {"ok":true,"email":true,"database":false}.

---------------------------------------------------------------------

## 4. Folder structure

    client/               The website (React + Vite)
      src/config/         ALL editable content: site.js, content.js, projects.js
      src/pages/          One file per page
      src/components/     Nav, Footer, forms, images
      src/styles/         global.css
      scripts/seo.mjs     Generates robots.txt and sitemap.xml at build
    server/src/           The API (Express): routes, email, database
    api/index.js          Vercel entry point for the API
    prisma/schema.prisma  Database tables
    vercel.json           Vercel settings
    .env.example          Every setting, explained
    package.json          Server dependencies and scripts (project root)

How it works: the browser loads the React site. Forms send JSON to /api/contact or /api/quote. The API validates the data, optionally saves it, emails the company, and emails the customer a confirmation with a reference number.

---------------------------------------------------------------------

## 5. Settings (.env)

See .env.example, every variable is explained there.

Email: use your email host's SMTP details. Gmail: turn on 2-step verification, create an App Password, use smtp.gmail.com, port 587, your address as SMTP_USER, the App Password as SMTP_PASS. Never use your normal password.

WhatsApp: set VITE_WHATSAPP_NUMBER in client/.env (create it from client/.env.example), digits only with country code, no plus or spaces, for example 27XXXXXXXXX. On Vercel add VITE_WHATSAPP_NUMBER as an environment variable. Leave empty until confirmed: the button then goes to the Contact page.

Company details: edit client/src/config/site.js. Logo: put the file in client/public/logo/ and set logoSrc to '/logo/yourfile.svg'.

---------------------------------------------------------------------

## 6. Can I use Supabase for the database? Yes.

Supabase is PostgreSQL, which this project already uses (Prisma). You only need its database connection string.

Do this:
1. supabase.com, New project. Choose a region close to your customers and set a strong database password. Save it.
2. Click Connect (top of the project), choose ORMs / Prisma, and copy:
   - the Transaction pooler string (port 6543). For Vercel add to its end: ?pgbouncer=true&connection_limit=1
   - the Session pooler or Direct string (port 5432), used once to create tables.
   Replace [YOUR-PASSWORD] in the string with your password. If the password contains symbols, URL-encode them.
3. Create the tables from your computer. In .env set DATABASE_URL to the port 5432 string, then run:

       npm run db:push

   Note: Supabase "Direct" can need IPv6. If it fails to connect, use the Session pooler string instead.
4. SECURITY, do not skip. In Supabase open SQL Editor and run:

       alter table "Enquiry" enable row level security;
       alter table "EmailLog" enable row level security;

   This stops anyone reading customer data through Supabase's public API. The website's own server still works because it connects directly.
5. For Vercel, put the port 6543 string in DATABASE_URL (section 7). For local runs you can use either.

Notes: never put the Supabase anon key or service key in this project, it does not need them. Free Supabase projects pause after a week of inactivity, so use a paid plan for a live client site. Back up regularly.
Database is optional: with DATABASE_URL empty, enquiries are still emailed, just not stored.

---------------------------------------------------------------------

## 7. Put it on Vercel and test on your phone (step by step)

Note: Vercel's free Hobby plan is for personal, non-commercial use. A live business website should use a paid Vercel plan. Testing is fine on Hobby.

STEP A. Put the project on GitHub
1. Create a free account at github.com and click New repository. Name it, choose Private, do not add any files. Click Create.
2. In a terminal in the project root (the folder with package.json):

       git init
       git add .
       git commit -m "Construction website"
       git branch -M main
       git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
       git push -u origin main

   The .gitignore keeps .env and node_modules out. Check on GitHub that no .env file was uploaded.

STEP B. Import into Vercel
1. Go to vercel.com, sign up with GitHub.
2. Add New, then Project. Import your repository.
3. Framework Preset: Other. Root Directory: leave as ./ . Do not change Build Command or Output Directory. vercel.json already sets them.
4. Open Environment Variables and add each of these (Name, Value):
   - COMPANY_NAME
   - COMPANY_EMAIL
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASS
   - MAIL_FROM (optional)
   - DATABASE_URL (optional, the Supabase port 6543 string from section 6)
   - VITE_WHATSAPP_NUMBER (optional)
   - SITE_URL (optional now, set it to your final address once known, for example https://www.example.co.za)
5. Click Deploy and wait for the build (about 1 to 2 minutes).

STEP C. Test on your phone
1. When it finishes, Vercel shows a link ending in .vercel.app. Open that link on your phone (or scan the QR code on the Vercel page).
2. Open YOUR-LINK/api/health. You should see ok true, email true. If email is false, a variable is missing.
3. Test: open and close the hamburger menu, tap every link, rotate the phone, submit the Contact form and the Quote form. You should receive the email at COMPANY_EMAIL, and the sender should receive a confirmation.
4. After changing an environment variable, go to Deployments, open the latest, and click Redeploy. Variables only apply to new deployments.

STEP D. Update the live site
Each time you run `git add . && git commit -m "message" && git push`, Vercel rebuilds automatically.

STEP E. Your own domain (later)
Vercel project, Settings, Domains, Add. Follow the DNS instructions. Then set SITE_URL to the domain and redeploy so the sitemap uses it.

If Vercel's preview links ask you to log in: Settings, Deployment Protection. The main .vercel.app production link is public.

---------------------------------------------------------------------

## 7b. Production build locally

    cd client
    npm run build
    npm run preview

---------------------------------------------------------------------

## 8. Troubleshooting

- "Cannot find path ...\client": you are one folder too high or low. Run `dir` (Windows) or `ls` and enter the folder that contains the client folder.
- Page is blank after updating: run `npm install` in the root AND in client/ (new packages were added), then restart both terminals.
- Form says "Our enquiry system is not available": email variables missing. Check /api/health.
- Form says "We could not send your message": SMTP login rejected. Check host, port, user, and use an App Password for Gmail.
- /api/health shows database false but you set DATABASE_URL: restart the server and check the string has no spaces and the password is URL-encoded.
- Vercel build fails: open the failed deployment, read the red lines in the build log, and send them to the assistant.
- Prisma error "Can't reach database": use the Session pooler string for `npm run db:push`.
- Menu or navigation misbehaves on your phone: note the phone model, browser and what you tapped, and report it.

---------------------------------------------------------------------

## 9. Roadmap (next)
1. Admin dashboard with secure login
2. Quotations and invoices with PDF and email
3. Image upload and real photography
4. Automated tests, accessibility and speed audit
5. Final client review checklist
