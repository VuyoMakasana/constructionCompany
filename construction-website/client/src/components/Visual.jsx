import { User } from 'lucide-react';
const scenes = [
 'M20 260H380M60 260V130H190V260M60 130L125 80L190 130M230 260V60H340V260M230 110H340M230 160H340M230 210H340',
 'M20 260H380M50 260V170H350V260M50 170H350M110 170V260M200 170V260M290 170V260M90 170V110H310V170',
 'M20 260H380M70 260V90H170V260M70 140H170M70 190H170M210 260V150H330V260M210 150L270 110L330 150',
 'M20 260H380M40 260L120 120L200 260M160 260L260 90L360 260M120 120V260M260 90V260',
 'M20 260H380M60 260V200H340V260M60 200L110 150H290L340 200M150 150V260M250 150V260',
 'M20 260H380M80 260V80M80 80H320M320 80V260M80 140H320M80 200H320M200 80V260',
];
export default function Visual({ n = 0, label = 'Illustrative image', className = '' }) {
  return (<figure className={`vis ${className}`}>
    <svg viewBox="0 0 400 300" width="400" height="300" aria-hidden="true"><path d={scenes[n % scenes.length]} fill="none" stroke="#B7A58A" strokeWidth="1.5" /></svg>
    <figcaption className="tag">{label}</figcaption></figure>);
}
export function Portrait({ label = 'Placeholder portrait' }) {
  return (<figure className="vis portrait" role="img" aria-label={label}><User size={96} strokeWidth={1} color="#B7A58A" /><figcaption className="tag">{label}</figcaption></figure>);
}
