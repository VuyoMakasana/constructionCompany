import { Link } from 'react-router-dom';
import PageHero, { Draft } from '../components/PageHero.jsx';
import Visual from '../components/Visual.jsx';
import Cta from '../components/Cta.jsx';
import { services } from '../config/content.js';
export default function Services() {
  return (<>
    <PageHero title="Construction services" lead="From groundwork to finishing, explore what we can build for you." />
    <div className="wrap"><Draft /></div>
    {services.map((s, i) => (
      <section key={s.slug} id={s.slug} className={`section sm${i % 2 ? ' alt' : ''}`}><div className="wrap"><div className={`split${i % 2 ? ' rev' : ''}`}>
        <Visual n={i} />
        <div><h2 className="h2">{s.title}</h2><p className="mut">{s.text}</p>
          <ul className="ticks">{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
          <div className="btns"><Link className="btn" to={`/services/${s.slug}`}>Learn more</Link><Link className="btn btn-ghost" to="/quote">Request a Quote</Link></div></div>
      </div></div></section>))}
    <Cta /></>);
}
