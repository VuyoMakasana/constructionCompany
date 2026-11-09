import { useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Cta from '../components/Cta.jsx';
import NotFound from './NotFound.jsx';
import { projects } from '../config/projects.js';
export default function ProjectDetail() {
  const p = projects.find((x) => x.slug === useParams().slug);
  if (!p) return <NotFound />;
  return (<><PageHero title={p.title} lead={[p.type, p.location].filter(Boolean).join(', ')} />
    <section className="section"><div className="wrap narrow"><p className="lead">{p.description}</p></div></section><Cta /></>);
}
