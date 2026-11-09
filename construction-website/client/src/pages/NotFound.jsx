import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
export default function NotFound() {
  return (<><PageHero title="Page not found" lead="The page you are looking for does not exist or has moved." />
    <section className="section"><div className="wrap"><div className="btns" style={{ marginTop: 0 }}><Link className="btn" to="/">Back to home</Link><Link className="btn btn-ghost" to="/services">View services</Link></div></div></section></>);
}
