import PageHero, { Draft } from '../components/PageHero.jsx';
import { Portrait } from '../components/Visual.jsx';
import Cta from '../components/Cta.jsx';
import { profiles } from '../config/content.js';
export default function Profile({ who }) {
  const p = profiles[who];
  return (<><PageHero title={p.name} lead={p.title} />
    <section className="section"><div className="wrap"><Draft /><div className="split top"><Portrait />
      <div><p className="lead dk">{p.intro}</p>{p.blocks.map(([t, d]) => <div key={t} className="blk"><h2 className="h3">{t}</h2><p className="mut">{d}</p></div>)}</div></div></div></section><Cta /></>);
}
