// Single source of truth. Edit here; nothing else needs changing.
// Items marked needsConfirmation must be verified by the company before launch.
export const site = {
  name: 'Your Company Name',            // needsConfirmation
  tagline: 'Building with Purpose. Delivering with Precision.',
  intro: 'Professional construction solutions built around quality, careful planning and attention to detail.',
  logoSrc: null,                         // e.g. '/logo/logo.svg' to replace the wordmark
  email: '',                             // needsConfirmation
  phone: '',                             // needsConfirmation
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  whatsappMessage: 'Hello, I would like to enquire about a construction project.',
  address: '',                           // needsConfirmation
};
export const whatsappHref = site.whatsappNumber
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}` : '/contact';
export const nav = [
  { to: '/', label: 'Home' }, { to: '/about', label: 'About' }, { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { label: 'Our Team', children: [{ to: '/founder', label: 'Founder' }, { to: '/supervisor', label: 'Supervisor' }] },
  { to: '/contact', label: 'Contact' },
];
export const serviceGroups = [ // proposed catalogue, pending confirmation
  { title: 'General construction', text: 'New buildings, extensions and structural construction.' },
  { title: 'Residential', text: 'Houses, custom homes, garages and boundary walls.' },
  { title: 'Commercial', text: 'Offices, retail and industrial buildings.' },
  { title: 'Renovations', text: 'Kitchens, bathrooms, interiors and restoration.' },
  { title: 'Civil and structural', text: 'Foundations, concrete, retaining walls and drainage.' },
  { title: 'Roofing and finishing', text: 'Roofs, plastering, painting, tiling and waterproofing.' },
];
export const process = ['Initial enquiry','Consultation','Project assessment','Planning and quotation','Agreement and preparation','Construction','Quality checks','Final handover'];
export const values = [
  ['Quality', 'Careful workmanship and materials chosen for the job.'],
  ['Communication', 'Clear updates from first call to handover.'],
  ['Planning', 'Scope, sequence and site preparation agreed before work starts.'],
  ['Responsibility', 'Safe sites and respect for clients and neighbours.'],
];
export const faqs = [
  ['How do I request a quotation?', 'Use the Request a Quote page and describe your project. We review it and respond with next steps.'],
  ['Can you give a price straight away?', 'Costs depend on scope, site and materials, so we assess the project before quoting.'],
  ['How long will my project take?', 'Timelines depend on the project. We confirm an expected schedule once the scope is agreed.'],
];
