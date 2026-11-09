import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { site, nav } from '../config/site.js';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${site.name} home`}>
      {site.logoSrc ? <img src={site.logoSrc} alt={site.name} width="160" height="32" /> : <span>{site.name}</span>}
    </Link>
  );
}

const flat = nav.flatMap((i) => (i.children ? i.children : [i]));

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isOpen = useRef(false);
  const scrollY = useRef(0);
  const burger = useRef(null);

  // Lock the page behind the menu without any layout shift (works on iOS Safari too).
  const lock = () => {
    scrollY.current = window.scrollY;
    const b = document.body.style;
    b.position = 'fixed'; b.top = `-${scrollY.current}px`; b.left = '0'; b.right = '0';
  };
  const unlock = (restore) => {
    const b = document.body.style;
    b.position = ''; b.top = ''; b.left = ''; b.right = '';
    if (restore) window.scrollTo({ top: scrollY.current, left: 0, behavior: 'auto' });
  };
  const openMenu = () => { if (isOpen.current) return; lock(); isOpen.current = true; setOpen(true); };
  const closeMenu = (restore = true) => { if (!isOpen.current) return; isOpen.current = false; unlock(restore); setOpen(false); };

  useEffect(() => { closeMenu(false); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen.current) { closeMenu(true); burger.current?.focus(); } };
    const mq = window.matchMedia('(min-width: 900px)');
    const onMq = () => { if (mq.matches) closeMenu(true); };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      if (isOpen.current) unlock(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Clicking a link: go there, and close the menu without restoring the old scroll position.
  const go = (to) => () => closeMenu(to === pathname);

  return (
    <header className="nav">
      <div className="nav-in">
        <Logo />
        <nav className="desk" aria-label="Main">
          {nav.map((i) => i.children ? (
            <div className="dd" key={i.label}>
              <button type="button" className="lnk" aria-haspopup="true">{i.label}<ChevronDown size={14} aria-hidden="true" /></button>
              <div className="dd-panel">{i.children.map((c) => <NavLink key={c.to} to={c.to} className="lnk">{c.label}</NavLink>)}</div>
            </div>
          ) : <NavLink key={i.to} to={i.to} end={i.to === '/'} className="lnk">{i.label}</NavLink>)}
          <Link to="/quote" className="btn btn-sm">Request a Quote</Link>
        </nav>
        <button ref={burger} type="button" className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="sheet" onClick={() => (open ? closeMenu(true) : openMenu())}>
          <i /><i />
        </button>
      </div>
      <nav id="sheet" className={`sheet${open ? ' open' : ''}`} aria-label="Mobile">
        {flat.map((i) => <NavLink key={i.to} to={i.to} end={i.to === '/'} className="s-lnk" onClick={go(i.to)}>{i.label}</NavLink>)}
        <Link to="/quote" className="btn s-cta" onClick={go('/quote')}>Request a Quote</Link>
      </nav>
    </header>
  );
}
