import { useState, useEffect } from 'react';
import { useResumeViewer } from './ResumeViewerContext';
import { scrollToSection } from './scrollToSection';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const StickyNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openResume } = useResumeViewer();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToSection(href));
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-lg bg-black/10">
        <div className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-bold tracking-tight text-white"
          >
            SC<span className="text-zinc-500">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-50 flex flex-col gap-1.5 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-zinc-400 transition-all duration-300 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-zinc-400 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-zinc-400 transition-all duration-300 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile right drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Dimmed backdrop — keeps most of the page in view */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel: ~28–30% width, slides in from the right */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute inset-y-0 right-0 flex w-[min(17.5rem,30vw)] min-w-[12rem] flex-col border-l border-zinc-800/80 bg-zinc-950/95 shadow-[-20px_0_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-transform duration-500 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)' }}
        >
          <div className="flex h-[60px] shrink-0 items-center justify-end px-4">
            {/* Space reserved so panel clears under hamburger */}
          </div>

          <div className="flex flex-1 flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Menu
            </p>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-white transition-colors active:bg-zinc-900 hover:bg-zinc-900/80 hover:text-zinc-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              onClick={() => {
                closeMenu();
                openResume();
              }}
              className="mt-auto w-full rounded-xl border border-zinc-700 bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 active:scale-[0.98] hover:bg-zinc-100"
            >
              View Resume
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default StickyNav;
