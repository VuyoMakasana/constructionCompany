import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Quote from './pages/Quote.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Process from './pages/Process.jsx';
import Why from './pages/Why.jsx';
import Profile from './pages/Profile.jsx';
import Faq from './pages/Faq.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';
import { site } from './config/site.js';
import { services } from './config/content.js';

const meta = {
  '/': [site.tagline, site.intro],
  '/about': ['About us', 'Our philosophy, mission, values and approach to construction.'],
  '/services': ['Construction services', 'General, residential and commercial construction, renovations, civil works, roofing and finishing.'],
  '/projects': ['Projects', 'Our portfolio of construction projects.'],
  '/process': ['Our process', 'How a project runs, from first enquiry to final handover.'],
  '/why': ['Why choose us', 'What to expect when you build with us.'],
  '/founder': ['Founder', 'Meet the founder.'],
  '/supervisor': ['Supervisor', 'Meet our site supervisor.'],
  '/faq': ['Frequently asked questions', 'Answers to common questions about our construction services.'],
  '/contact': ['Contact us', 'Contact us about your construction project.'],
  '/quote': ['Request a quote', 'Describe your project and request a quotation.'],
  '/privacy': ['Privacy Policy', 'How we collect, use and protect personal information.'],
  '/terms': ['Terms and Conditions', 'Terms for using this website and requesting quotations.'],
};
function pageMeta(path) {
  if (meta[path]) return meta[path];
  const s = path.startsWith('/services/') && services.find((x) => `/services/${x.slug}` === path);
  if (s) return [s.title, s.text];
  return ['Page not found', 'The page you are looking for does not exist.'];
}

export default function App() {
  const { pathname } = useLocation();
  // Layout effect: runs before the browser paints, so the new page appears already at the top (no visible jump).
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const [title, desc] = pageMeta(pathname);
    document.title = pathname === '/' ? title : `${title} | ${site.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
  }, [pathname]);
  return (<>
    <a href="#main" className="skip">Skip to content</a>
    <Nav />
    <main id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/process" element={<Process />} />
        <Route path="/why" element={<Why />} />
        <Route path="/founder" element={<Profile who="founder" />} />
        <Route path="/supervisor" element={<Profile who="supervisor" />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<Legal doc="privacy" />} />
        <Route path="/terms" element={<Legal doc="terms" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </>);
}
