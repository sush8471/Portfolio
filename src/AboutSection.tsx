import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useResumeViewer } from './ResumeViewerContext';
import { scrollToSection } from './scrollToSection';

const stack = ['Python', 'TypeScript', 'React', 'Supabase', 'Vercel', 'AI/ML APIs'];

const stats = [
  { value: '2', label: 'Full Products Shipped' },
  { value: '4', label: 'AI Prototypes Built' },
  { value: '5', label: 'Certifications' },
  { value: '3+', label: 'Years Building' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { openResume } = useResumeViewer();

  useEffect(() => {
    const contentTargets = contentRef.current
      ? Array.from(contentRef.current.children).flatMap((child) =>
          Array.from(child.children)
        )
      : [];

    if (reducedMotion) {
      gsap.set(
        [Array.from(headerRef.current?.children || []), ...contentTargets],
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(headerRef.current?.children || []),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentTargets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-6xl">
        {/* 1. HEADLINE */}
        <div ref={headerRef} className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
            About
          </p>
          <h2
            className="text-5xl font-normal leading-none tracking-tight md:text-7xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Engineering intelligence.
            <br />
            <span className="text-zinc-400">Designing interactions.</span>
          </h2>
        </div>

        <div ref={contentRef}>
          {/* 3. STATS BENTO */}
          <div className="mb-20 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-4 backdrop-blur-md sm:p-5 md:rounded-2xl md:p-6"
              >
                <div className="mb-1 text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <div className="text-xs text-zinc-400 md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 4. TECH STACK */}
          <div className="mb-20">
            <p className="mb-6 text-xs uppercase tracking-wider text-zinc-400">
              Primary Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-zinc-800/60 bg-zinc-900/20 px-4 py-2 font-mono text-sm text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 5. SINGLE CTA */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#work');
              }}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-zinc-200"
            >
              View Selected Work
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <button
              type="button"
              onClick={openResume}
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-8 py-4 font-medium text-zinc-300 transition-colors hover:border-zinc-500"
            >
              Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
