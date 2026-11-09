import { Link } from 'react-router-dom';
import { site, whatsappHref } from '../config/site.js';
import { Logo } from './Nav.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
export default function Footer() {
  return (
    <footer className="footer"><div className="wrap">
      <div className="f-grid">
        <div><Logo /><p className="muted">{site.intro}</p></div>
        <div><h2 className="f-h">Company</h2><Link to="/about">About</Link><Link to="/projects">Projects</Link><Link to="/process">Our process</Link><Link to="/faq">FAQ</Link></div>
        <div><h2 className="f-h">Services</h2><Link to="/services">All services</Link><Link to="/quote">Request a quote</Link></div>
        <div><h2 className="f-h">Contact</h2>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.phone && <a href={`tel:${site.phone}`}>{site.phone}</a>}
          <a href={whatsappHref} className="wa" {...(site.whatsappNumber ? { target: '_blank', rel: 'noreferrer' } : {})}><WhatsAppIcon size={18} /> WhatsApp</a>
          <Link to="/contact">Contact form</Link></div>
      </div>
      <div className="f-base"><span>&copy; {new Date().getFullYear()} {site.name}</span><span><Link to="/privacy">Privacy Policy</Link> <Link to="/terms">Terms and Conditions</Link></span></div>
    </div></footer>
  );
}
