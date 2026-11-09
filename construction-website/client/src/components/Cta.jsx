import { Link } from 'react-router-dom';
export default function Cta({ title = 'Tell us about your project' }) {
  return (<section className="section dark center"><div className="wrap narrow"><h2 className="h2">{title}</h2>
    <p className="lead">Send a few details and we will come back to you with next steps.</p>
    <div className="btns c"><Link className="btn btn-light" to="/quote">Request a Quote</Link><Link className="btn btn-ghost-l" to="/contact">Contact us</Link></div></div></section>);
}
