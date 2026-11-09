export default function PageHero({ title, lead, children }) {
  return (<section className="phero"><div className="wrap"><h1 className="display sm">{title}</h1>{lead && <p className="lead">{lead}</p>}{children}</div></section>);
}
export function Draft() { return <p className="note">Draft content, to be reviewed and confirmed by the company.</p>; }
