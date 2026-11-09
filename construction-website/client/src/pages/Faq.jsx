import PageHero from '../components/PageHero.jsx';
import Cta from '../components/Cta.jsx';
import { faqs } from '../config/content.js';
export default function Faq() {
  return (<><PageHero title="Frequently asked questions" lead="Straight answers to common questions." />
    <section className="section"><div className="wrap narrow">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section><Cta /></>);
}
