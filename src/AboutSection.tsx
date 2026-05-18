import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section
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
            I’m <span className="text-white">Sushant Chaudhary</span>, a student developer obsessed with the frontier of Artificial Intelligence and user experience. Currently on a dedicated journey to becoming an <span className="text-white">AI Developer</span>, I bridge the gap between machine reasoning and clean, functional frontend design.
          </p>
          <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
            Rather than just studying theories, I believe in learning by actively building. From automated visual pipelines to custom language model integrations, I focus on shipping functional, production-ready web apps that solve real-world problems.
          </p>
          <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
            I enjoy building intelligent agent workflows, orchestrating APIs with n8n, designing databases on Supabase, and scripting in Python. I thrive in the space where clean engineering discipline meets creative technological exploration.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10">Explore My Work</span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-zinc-700 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-900"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
