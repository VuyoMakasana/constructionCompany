import PageHero from '../components/PageHero.jsx';
import Visual from '../components/Visual.jsx';
import Cta from '../components/Cta.jsx';
import { Link } from 'react-router-dom';
import { projects } from '../config/projects.js';
const concepts = ['Residential concept','Commercial concept','Structural concept'];
export default function Projects() {
  return (<>
    <PageHero title="Projects" lead={projects.length ? 'A selection of our completed work.' : 'Our portfolio is being prepared. Completed projects will be shown here once photographs and details are confirmed.'} />
    <section className="section"><div className="wrap">
      {projects.length ? <div className="grid3">{projects.map((p) => <Link key={p.slug} to={`/projects/${p.slug}`} className="tile"><h3>{p.title}</h3><p>{p.type}{p.location ? `, ${p.location}` : ''}</p></Link>)}</div> : (<>
        <h2 className="h2">Design concepts</h2>
        <p className="lead">These are illustrative compositions only. They are not projects completed by the company.</p>
        <div className="grid3 gap">{concepts.map((c, i) => <div key={c}><Visual n={i + 1} label="Concept, not a completed project" /><h3 className="cap">{c}</h3></div>)}</div></>)}
    </div></section><Cta /></>);
}
