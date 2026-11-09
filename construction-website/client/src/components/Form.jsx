import { useState } from 'react';
export function useSubmit(url) {
  const [state, setState] = useState({ status: 'idle' });
  async function submit(data) {
    if (state.status === 'sending') return;
    setState({ status: 'sending' });
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'We could not send your message. Please try again.');
      setState({ status: 'done', reference: j.reference });
    } catch (e) {
      setState({ status: 'error', message: e.message === 'Failed to fetch' ? 'We could not reach the server. Check your connection and try again.' : e.message });
    }
  }
  return [state, submit];
}
export function Field({ label, name, type = 'text', required, children, ...rest }) {
  const id = `f-${name}`;
  return (<div className="fld"><label htmlFor={id}>{label}{required ? '' : ' (optional)'}</label>
    {children ? <>{children(id)}</> : <input id={id} name={name} type={type} required={required} {...rest} />}</div>);
}
export function Honeypot() {
  return <div className="hp" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex="-1" autoComplete="off" /></label></div>;
}
export function Status({ state, doneText }) {
  if (state.status === 'done') return <div className="msg ok" role="status"><strong>Thank you. Your request has been received.</strong><br />{doneText} Your reference is <strong>{state.reference}</strong>.</div>;
  if (state.status === 'error') return <div className="msg err" role="alert">{state.message}</div>;
  return null;
}
export function readForm(e) { e.preventDefault(); return Object.fromEntries(new FormData(e.currentTarget)); }
