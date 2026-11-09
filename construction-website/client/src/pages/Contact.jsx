import PageHero from '../components/PageHero.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSubmit, Field, Honeypot, Status, readForm } from '../components/Form.jsx';
import { site, whatsappHref } from '../config/site.js';
export default function Contact() {
  const [state, submit] = useSubmit('/api/contact');
  const done = state.status === 'done';
  return (<><PageHero title="Contact us" lead="Tell us what you need and we will respond as soon as we can." />
    <section className="section"><div className="wrap"><div className="split top">
      <div className="cinfo"><h2 className="h3">Get in touch</h2>
        {site.email && <a href={`mailto:${site.email}`}><Mail size={18} /> {site.email}</a>}
        {site.phone && <a href={`tel:${site.phone}`}><Phone size={18} /> {site.phone}</a>}
        {site.whatsappNumber && <a href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> Message us on WhatsApp</a>}
        {site.address && <a href="#form" style={{ pointerEvents: 'none' }}><MapPin size={18} /> {site.address}</a>}
        {!site.email && !site.phone && !site.whatsappNumber && <p>Direct contact details will be published here once confirmed. Please use the form.</p>}
      </div>
      <form id="form" className="form" onSubmit={(e) => submit(readForm(e))} aria-busy={state.status === 'sending'}>
        <Honeypot />
        <div className="row"><Field label="Full name" name="name" required autoComplete="name" maxLength="100" /><Field label="Email address" name="email" type="email" required autoComplete="email" maxLength="150" /></div>
        <div className="row"><Field label="Phone number" name="phone" type="tel" autoComplete="tel" maxLength="30" /><Field label="Subject" name="subject" required maxLength="150" /></div>
        <Field label="Message" name="message" required>{(id) => <textarea id={id} name="message" required minLength="10" maxLength="3000" />}</Field>
        <p className="note" style={{ margin: 0 }}>By sending this form you agree to us using your details to respond, as described in our Privacy Policy.</p>
        <button className="btn" type="submit" disabled={state.status === 'sending' || done}>{state.status === 'sending' ? 'Sending...' : 'Send message'}</button>
        <Status state={state} doneText="We have emailed you a confirmation." />
      </form></div></div></section></>);
}
