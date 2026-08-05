import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import MagneticButton from './MagneticButton';
import { useResumeViewer } from './ResumeViewerContext';
import { scrollToSection } from './scrollToSection';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { openResume } = useResumeViewer();

  useEffect(() => {
    if (reducedMotion) {
      gsap.set(
        [
          headingRef.current,
          ...(bioRef.current?.children || []),
        ],
        { opacity: 1, y: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio text paragraphs stagger reveal
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      {/* Subtle top gradient to blend from video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-black" />

      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            About Me
          </p>
          <h2
            ref={headingRef}
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Engineering intelligence.
            <br />
            <span className="text-zinc-400">Designing interactions.</span>
          </h2>
        </div>

        {/* Story Bio */}
        <div ref={bioRef} className="space-y-8 text-center">
          <p className="text-lg leading-relaxed text-zinc-300 md:text-xl font-medium">
            I'm <span className="text-white">Sushant Chaudhary</span>, a BCA student and independent software developer from Uttar Pradesh, India. I build and ship production-ready AI-powered web applications using Python, TypeScript, React, and modern backend tools.
          </p>
          <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
            Over the past 3+ years, I've independently shipped 2 full products — an interactive travel platform and a gaming e-commerce store — plus several simpler AI wrappers and prototypes. I work with Python, React, Supabase, and deploy end-to-end on Vercel.
          </p>
          <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
            I'm currently seeking software development internships where I can contribute to real product work, ship features, and grow alongside experienced engineering teams.
          </p>

          {/* Metrics Row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-4 pb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Full Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">AI Prototypes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">3+</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Years Building</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Uttar Pradesh, India
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3v-5"/></svg>
              BCA · Integral University Lucknow · 2023 – 2026
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Open to Internships & Full-Time
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <MagneticButton
              as="a"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#projects');
              }}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Explore My Work
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={openResume}
              className="rounded-full border border-zinc-600 bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              View Resume
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="rounded-full border border-zinc-700 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900"
            >
              Get in Touch
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
