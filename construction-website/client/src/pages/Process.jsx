import PageHero, { Draft } from '../components/PageHero.jsx';
import Cta from '../components/Cta.jsx';
import { processSteps } from '../config/content.js';
export default function Process() {
  return (<><PageHero title="Our process" lead="A clear path from first conversation to final handover." />
    <section className="section"><div className="wrap narrow"><Draft />
      <ol className="plist">{processSteps.map(([t, d]) => <li key={t}><h2 className="h3">{t}</h2><p className="mut">{d}</p></li>)}</ol></div></section><Cta /></>);
}
