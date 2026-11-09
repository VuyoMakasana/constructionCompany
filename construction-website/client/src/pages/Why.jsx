import PageHero, { Draft } from '../components/PageHero.jsx';
import Visual from '../components/Visual.jsx';
import Cta from '../components/Cta.jsx';
import { why } from '../config/content.js';
export default function Why() {
  return (<><PageHero title="Why choose us" lead="What you can expect when you build with us." />
    <section className="section"><div className="wrap"><Draft /><div className="split"><div>{why.map(([t, d]) => <div key={t} className="blk"><h2 className="h3">{t}</h2><p className="mut">{d}</p></div>)}</div><Visual n={5} /></div></div></section><Cta /></>);
}
