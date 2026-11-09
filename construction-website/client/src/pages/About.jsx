import PageHero, { Draft } from '../components/PageHero.jsx';
import Visual from '../components/Visual.jsx';
import Cta from '../components/Cta.jsx';
import { site, values } from '../config/site.js';
const blocks = [
 ['Our philosophy','Good construction starts long before the first brick. We believe in understanding what a client needs, planning carefully and then building to the agreed standard.'],
 ['Our mission','To deliver construction work that clients can rely on, through honest communication, careful planning and attention to detail.'],
 ['Our vision','To be a construction company known for quality of work and the way we treat the people we build for.'],
];
export default function About() {
  return (<>
    <PageHero title={`About ${site.name}`} lead="A construction company built around quality, planning and clear communication." />
    <section className="section"><div className="wrap"><Draft />
      <div className="split"><div>{blocks.map(([t, d]) => <div key={t} className="blk"><h2 className="h3">{t}</h2><p>{d}</p></div>)}</div><Visual n={0} /></div></div></section>
    <section className="section alt"><div className="wrap"><h2 className="h2">Our values</h2>
      <div className="grid4">{values.map(([t, d]) => <div key={t}><h3>{t}</h3><p className="mut">{d}</p></div>)}</div></div></section>
    <section className="section"><div className="wrap"><div className="split rev"><Visual n={4} />
      <div><h2 className="h2">Our approach and commitment</h2><p className="mut">Every project follows the same path: consultation, assessment, planning, construction, quality checks and handover. We agree the scope before we build, and we tell you early if anything changes.</p>
      <p className="mut">Quality and professionalism are not extras. They are how we expect every project to be run.</p></div></div></div></section>
    <Cta /></>);
}
