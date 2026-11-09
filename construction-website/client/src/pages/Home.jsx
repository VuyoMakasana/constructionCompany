import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { site, serviceGroups, process, values, faqs, whatsappHref } from '../config/site.js';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
export default function Home() {
  return (<>
    <section className="hero">
      <div className="wrap hero-in">
        <h1 className="display">{site.tagline}</h1>
        <p className="lead">{site.intro}</p>
        <div className="btns"><Link className="btn" to="/services">Explore Our Services</Link><Link className="btn btn-ghost" to="/quote">Request a Quote</Link></div>
      </div>
      <figure className="art" aria-label="Illustrative architectural line composition. Not a completed project.">
        <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" width="1200" height="420" aria-hidden="true">
          <g fill="none" stroke="#B7A58A" strokeWidth="1.5">
            <path d="M0 400H1200"/><path d="M120 400V220H360V400M120 220L240 150L360 220"/><path d="M420 400V120H640V400M420 200H640M420 280H640M530 120V400"/>
            <path d="M700 400V250H1000V400M700 250H1000M760 250V400M850 250V400M940 250V400"/><path d="M1040 400V180H1120V400M1040 260H1120"/>
          </g></svg>
      </figure>
    </section>
    <section className="section"><div className="wrap narrow center">
      <h2 className="h2">Careful planning. Honest communication. Solid workmanship.</h2>
      <p className="lead">We approach every project the same way: understand what you need, plan it properly, then build it to the agreed standard.</p>
      <Link className="link" to="/about">About us <ArrowRight size={16} /></Link>
    </div></section>
    <section className="section alt"><div className="wrap">
      <h2 className="h2">Services</h2><p className="note">Draft list, pending company confirmation.</p>
      <div className="grid3">{serviceGroups.map((s) => <Link to="/services" className="tile" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></Link>)}</div>
    </div></section>
    <section className="section"><div className="wrap">
      <h2 className="h2">Featured projects</h2>
      <p className="lead">Our project gallery is being prepared. Completed work will appear here once photographs and details are confirmed.</p>
      <Link className="link" to="/projects">View projects <ArrowRight size={16} /></Link>
    </div></section>
    <section className="section dark"><div className="wrap">
      <h2 className="h2">What you can expect</h2>
      <div className="grid4">{values.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>
    <section className="section"><div className="wrap">
      <h2 className="h2">How a project works</h2>
      <ol className="steps">{process.map((p) => <li key={p}>{p}</li>)}</ol>
    </div></section>
    <section className="section alt"><div className="wrap narrow">
      <h2 className="h2">Common questions</h2>
      {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      <Link className="link" to="/faq">All questions <ArrowRight size={16} /></Link>
    </div></section>
    <section className="section dark center"><div className="wrap narrow">
      <h2 className="h2">Tell us about your project</h2>
      <p className="lead">Send a few details and we will come back to you with next steps.</p>
      <div className="btns c"><Link className="btn btn-light" to="/quote">Request a Quote</Link>
        <a className="btn btn-ghost-l" href={whatsappHref} {...(site.whatsappNumber ? { target: '_blank', rel: 'noreferrer' } : {})}><WhatsAppIcon /> WhatsApp</a></div>
    </div></section>
  </>);
}
