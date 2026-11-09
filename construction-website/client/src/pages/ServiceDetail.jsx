import { Link, useParams } from 'react-router-dom';
import PageHero, { Draft } from '../components/PageHero.jsx';
import Visual from '../components/Visual.jsx';
import Cta from '../components/Cta.jsx';
import NotFound from './NotFound.jsx';
import { services, involves, benefits } from '../config/content.js';
export default function ServiceDetail() {
  const { slug } = useParams();
  const i = services.findIndex((s) => s.slug === slug);
  if (i < 0) return <NotFound />;
  const s = services[i];
  return (<>
    <PageHero title={s.title} lead={s.text}><div className="btns"><Link className="btn btn-light" to="/quote">Request a Quote</Link></div></PageHero>
    <section className="section"><div className="wrap"><Draft /><div className="split"><Visual n={i} />
      <div><h2 className="h3">What this includes</h2><ul className="ticks">{s.items.map((x) => <li key={x}>{x}</li>)}</ul></div></div></div></section>
    <section className="section alt"><div className="wrap"><div className="grid2">
      <div><h2 className="h3">What the service involves</h2><ul className="ticks">{involves.map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div><h2 className="h3">Benefits</h2><ul className="ticks">{benefits.map((x) => <li key={x}>{x}</li>)}</ul></div></div>
      <p><Link className="link" to="/services">Back to all services</Link></p></div></section>
    <Cta title={`Enquire about ${s.title.toLowerCase()}`} /></>);
}
