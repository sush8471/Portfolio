import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Hash } from 'lucide-react';
import MagneticButton from './MagneticButton';
import ImageLightbox from './ImageLightbox';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  image: string;
}

const certifications: Certification[] = [
  {
    title: 'Introduction to Artificial Intelligence (AI)',
    issuer: 'IBM',
    date: 'Feb 2026',
    credentialId: '610ZOOMAEVDI',
    verifyUrl: 'https://coursera.org/verify/610ZOOMAEVDI',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Cognitive Computing'],
    image: '/images/certifications/ibm-ai.png',
  },
  {
    title: 'AI Fluency for students',
    issuer: 'Anthropic',
    date: 'Sep 2025',
    credentialId: 'ANT-AIF-2025',
    verifyUrl: '#',
    skills: ['AI Fluency', 'Claude', 'Generative AI', 'Prompt Engineering'],
    image: '/images/certifications/anthropic-ai.png',
  },
  {
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI',
    date: 'Oct 2025',
    credentialId: '7A4VN8BXMASL',
    verifyUrl: 'https://coursera.org/verify/7A4VN8BXMASL',
    skills: ['AI Strategy', 'Neural Networks', 'Generative AI', 'Deep Learning'],
    image: '/images/certifications/deeplearning-ai.png',
  },
  {
    title: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle',
    date: 'Aug 2025',
    credentialId: '102459920OCI25AICFA',
    verifyUrl: '#',
    skills: ['Oracle Cloud', 'OCI', 'AI Foundations', 'Machine Learning'],
    image: '/images/certifications/oracle-ai.png',
  },
  {
    title: 'Learn Graphic Design using Canva & Start Freelancing',
    issuer: 'Udemy',
    date: 'Sep 2024',
    credentialId: 'UC-10b80ae8-dcaf-486b-a9ed-85ff1b364b0a',
    verifyUrl: 'https://ude.my/UC-10b80ae8-dcaf-486b-a9ed-85ff1b364b0a',
    skills: ['Graphic Design', 'Canva', 'Freelancing', 'Branding'],
    image: '/images/certifications/udemy-design.png',
  },
  {
    title: 'Vibe Coding Essentials - Build Apps with AI',
    issuer: 'Coursera',
    date: 'Feb 2026',
    credentialId: 'LH3NTA088A2Y',
    verifyUrl: 'https://coursera.org/verify/specialization/LH3NTA088A2Y',
    skills: ['Vibe Coding', 'Claude Code', 'Cursor AI', 'MCP'],
    image: '/images/certifications/vibecoding-ai.png',
  },
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      gsap.set(
        [
          ...(headerRef.current?.children || []),
          ...cardsRef.current.filter(Boolean),
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

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
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Credentials
          </p>
          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Validated by
            <br />
            <span className="text-zinc-400">industry standards</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert, index) => (
            <div
              key={cert.credentialId}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 backdrop-blur-md transition-all duration-500 hover:border-zinc-700/50 hover:bg-zinc-900/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
            >
              {/* Inner glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent" />

              {/* Certificate Image Preview with premium Hover Effect */}
              <div 
                onClick={() => setActiveCert(cert)}
                className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-950/50 cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
                
                {/* View Certificate Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-xl border border-white/10 bg-zinc-950/80 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-transform duration-300 scale-95 group-hover:scale-100 shadow-lg">
                    View Certificate
                  </span>
                </div>

                {/* Issuer Badge on Image (fades out on hover overlay) */}
                <span className="absolute right-3 top-3 rounded-full border border-zinc-700/40 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-300 backdrop-blur-md group-hover:opacity-0 transition-opacity duration-300">
                  {cert.issuer}
                </span>
              </div>

              {/* Content */}
              <div className="mb-6 flex-1">
                <h3 className="mb-3 text-lg font-bold leading-snug text-white md:text-xl line-clamp-2">
                  {cert.title}
                </h3>

                <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar size={12} />
                  <span>{cert.date}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Hash size={12} />
                  <span className="font-mono text-[11px]">{cert.credentialId}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-zinc-800/60 bg-zinc-800/40 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom edge light */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Premium Lightbox Modal */}
      {activeCert && (
        <ImageLightbox
          image={activeCert.image}
          title={activeCert.title}
          issuer={activeCert.issuer}
          verifyUrl={activeCert.verifyUrl}
          onClose={() => setActiveCert(null)}
        />
      )}
    </section>
  );
};

export default CertificationsSection;
