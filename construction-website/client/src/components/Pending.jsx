import { Link } from 'react-router-dom';
export default function Pending({ title }) {
  return <section className="section"><div className="wrap narrow"><h1 className="h2">{title}</h1>
    <p className="lead">This page is scheduled for the next build phase.</p><div className="btns"><Link className="btn" to="/">Back to home</Link></div></div></section>;
}
