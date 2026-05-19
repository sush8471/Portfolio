import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Sushant has an amazing drive for building functional AI workflows. His n8n pipelines and database setups saved us days of manual API testing.",
    author: 'Karan Sharma',
    role: 'Collaborator',
    company: 'OpenSource Project',
  },
  {
    quote:
      "A highly dedicated student developer who doesn't just study AI theories but builds live, operational web products. His ResumeDEX and ReplyDEX are proof of his execution speed.",
    author: 'Dr. Anjali Mehta',
    role: 'Academic Advisor',
    company: 'CS Department',
  },
  {
    quote:
      "Sushant is great to work with. He grasps prompt engineering, agent flow-structures, and database integrations quickly. A stellar builder on the rise.",
    author: 'Rohan Varma',
    role: 'Peer Builder',
    company: 'Vercel Buildathon',
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const wrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reset wrapper transforms if reduced motion is active
    if (reducedMotion) {
      wrappersRef.current.forEach((wrapper) => {
        if (wrapper) {
          wrapper.style.transform = '';
        }
      });
      gsap.set(
        [
          ...(headerRef.current?.children || []),
          ...cardsRef.current.filter(Boolean),
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    // Mouse parallax drift
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = (e.clientX - cx) / (rect.width / 2);
      const my = (e.clientY - cy) / (rect.height / 2);

      wrappersRef.current.forEach((wrapper, i) => {
        if (!wrapper) return;
        const depth = 12 + (i % 3) * 8;
        const x = mx * depth * -1;
        const y = my * depth * -1;
        wrapper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    section.addEventListener('mousemove', onMove);

    // GSAP entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => {
      section.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Kind Words
          </p>
          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Trusted by those
            <br />
            <span className="text-zinc-400">who've worked alongside</span>
          </h2>
        </div>

        {/* Scattered Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              ref={(el) => {
                wrappersRef.current[i] = el;
              }}
              className={`transition-transform duration-300 ease-out will-change-transform ${
                i === 1 ? 'md:mt-16' : i === 2 ? 'md:-mt-8' : ''
              }`}
            >
              <div
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group relative h-full overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-8 backdrop-blur-md transition-all duration-500 hover:border-zinc-700/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
              >
                {/* Inner glow */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent" />

                <Quote
                  size={32}
                  className="mb-6 text-zinc-700 transition-colors duration-500 group-hover:text-zinc-500"
                  strokeWidth={1.5}
                />

                <blockquote className="mb-8 text-lg leading-relaxed text-zinc-300 md:text-xl">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-400">
                    {t.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-sm text-zinc-500">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
