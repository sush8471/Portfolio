import { useState, useEffect } from 'react';
import { useResumeViewer } from './ResumeViewerContext';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const StickyNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openResume } = useResumeViewer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-zinc-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <a
          href="#"
          className="text-sm font-bold tracking-tight text-white"
        >
          SC<span className="text-zinc-500">.</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-wider text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={openResume}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
