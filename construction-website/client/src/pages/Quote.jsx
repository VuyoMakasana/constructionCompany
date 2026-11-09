import PageHero from '../components/PageHero.jsx';
import { useSubmit, Field, Honeypot, Status, readForm } from '../components/Form.jsx';
const budgets = ['Not sure yet', 'Under R100 000', 'R100 000 to R500 000', 'R500 000 to R1 000 000', 'R1 000 000 to R5 000 000', 'Over R5 000 000'];
export default function Quote() {
  const [state, submit] = useSubmit('/api/quote');
  const done = state.status === 'done';
  return (<><PageHero title="Request a quote" lead="Describe your project and we will contact you with next steps. A written quotation follows once we understand the scope." />
    <section className="section"><div className="wrap narrow">
      <form className="form" onSubmit={(e) => submit(readForm(e))} aria-busy={state.status === 'sending'}>
        <Honeypot />
        <div className="row"><Field label="Full name" name="name" required autoComplete="name" maxLength="100" /><Field label="Email address" name="email" type="email" required autoComplete="email" maxLength="150" /></div>
        <div className="row"><Field label="Phone number" name="phone" type="tel" required autoComplete="tel" minLength="7" maxLength="30" />
          <Field label="Project type" name="projectType" required maxLength="100" placeholder="For example: house extension" /></div>
        <div className="row"><Field label="Residential or commercial" name="sector" required>{(id) => <select id={id} name="sector" required defaultValue=""><option value="" disabled>Select one</option><option>Residential</option><option>Commercial</option></select>}</Field>
          <Field label="Project location" name="location" required maxLength="150" /></div>
        <div className="row"><Field label="Approximate budget" name="budget">{(id) => <select id={id} name="budget" defaultValue="">{<option value="">Select a range</option>}{budgets.map((b) => <option key={b}>{b}</option>)}</select>}</Field>
          <Field label="Expected start date" name="startDate" type="date" /></div>
        <Field label="Project description" name="description" required>{(id) => <textarea id={id} name="description" required minLength="10" maxLength="3000" />}</Field>
        <p className="note" style={{ margin: 0 }}>You can send photographs or plans by replying to your confirmation email. This request is not a quotation and does not create a binding agreement.</p>
        <button className="btn" type="submit" disabled={state.status === 'sending' || done}>{state.status === 'sending' ? 'Sending...' : 'Submit request'}</button>
        <Status state={state} doneText="We have emailed you a confirmation." />
      </form></div></section></>);
}
