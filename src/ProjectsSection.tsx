import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ExternalLink } from 'lucide-react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  highlights?: string[];
  badge?: string;
}

const projects: Project[] = [
  {
    title: 'Mapravel',
    description:
      'A premium cinematic journey map service that turns your travels, milestones, and memories into a stunning interactive website with Mapbox fly-through animations, photo galleries, and shareable links.',
    image: '/images/projects/mapravel.png',
    tags: ['Next.js', 'Mapbox API', 'TypeScript', 'Supabase'],
    githubUrl: 'https://github.com/sush8471/Mapravel',
    liveUrl: 'https://mapravel.vercel.app/',
    highlights: ['3D globe interface', 'Mapbox GL integration', 'Travel memory journaling'],
    badge: 'Startup',
  },
  {
    title: 'Gamer Bhidu',
    description:
      'A fully functional e-commerce store for gaming products with modern UI, cart functionality, and seamless checkout experience.',
    image: '/images/projects/gamerbhidu.png',
    tags: ['React', 'JavaScript', 'CSS', 'Vercel'],
    githubUrl: 'https://github.com/sush8471/gamerbhidu',
    liveUrl: 'https://gamerbhidu.vercel.app/',
    highlights: ['Full cart system', 'Responsive product grid', 'Checkout flow'],
    badge: 'Startup',
  },
  {
    title: 'ResumeDEX',
    description:
      'An automated AI-powered resume screening and optimization platform built to parse resumes against job descriptions and boost interview matching rates.',
    image: '/images/projects/resumedex.png',
    tags: ['Python', 'Claude', 'n8n', 'Supabase'],
    githubUrl: 'https://github.com/sush8471/ResumeDEX',
    liveUrl: 'https://resumedex.vercel.app/',
    highlights: ['AI resume parser', '95% match accuracy', 'n8n automation pipeline'],
  },
  {
    title: 'Flydexify',
    description:
      'A vibe-based AI music recommendation service that analyzes uploaded images and language preferences to discover matching songs.',
    image: '/images/projects/flydexify.png',
    tags: ['React', 'Supabase', 'Python', 'n8n'],
    githubUrl: 'https://github.com/sush8471/flydexify',
    liveUrl: 'https://flydexify.vercel.app/',
    highlights: ['Image-to-song AI', 'Supabase RLS auth', 'Real-time recommendations'],
  },
  {
    title: 'FlydexGPT',
    description:
      'A premium LLM conversational interface with customizable templates and multi-model support for specialized development queries.',
    image: '/images/projects/flydexgpt.png',
    tags: ['Python', 'Claude', 'Supabase', 'TypeScript'],
    githubUrl: 'https://github.com/sush8471/flydexgpt',
    liveUrl: 'https://flydexgpt.vercel.app/',
    highlights: ['Multi-model LLM chat', 'Template system', 'Custom context engine'],
  },
  {
    title: 'Flydex Nutrients',
    description:
      'An AI-powered computer-vision application designed to analyze meal photos for instant nutritional insights with Harvard-certified precision.',
    image: '/images/projects/flydex-nutrients-analyzer.png',
    tags: ['Python', 'Claude', 'JavaScript', 'HTML'],
    githubUrl: 'https://github.com/sush8471/flydex-nutrients-analyzer',
    liveUrl: 'https://flydex-nutrients-analyzer.vercel.app/',
    highlights: ['Computer vision AI', 'Nutritional analysis', 'Harvard-certified data'],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (title: string) => {
    setExpandedCards((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    if (reducedMotion) {
      gsap.set(
        [
          ...(headerRef.current?.children || []),
          ...cardsRef.current.filter(Boolean),
        ],
        { opacity: 1, y: 0, rotateX: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered reveal — single ScrollTrigger for all cards
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 80, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Selected Work
          </p>
          <h2
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Projects that define
            <br />
            <span className="text-zinc-400">my craft</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            A curated selection of work spanning full-stack applications,
            interactive interfaces, and developer tooling.
          </p>
        </div>

        {/* Projects Grid / Horizontal Carousel for Mobile */}
        <div
          ref={gridRef}
          role="list"
          aria-label="Projects grid"
          className="flex items-start overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 gap-4 md:gap-8 snap-x snap-mandatory py-4 -mx-6 px-[10vw] md:mx-0 md:px-0 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              role="listitem"
              className={`snap-center shrink-0 w-[80vw] md:w-auto md:min-w-0 md:snap-start md:shrink group relative overflow-hidden rounded-2xl border bg-zinc-900/20 backdrop-blur-sm md:backdrop-blur-md transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] ${
                project.badge
                  ? 'border-amber-400/40 hover:border-amber-300/60'
                  : 'border-zinc-800/50 hover:border-zinc-700/50'
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-zinc-800">
                  <img
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Badge */}
                {project.badge && (
                  <span className="absolute left-3 top-3 rounded-full border border-amber-400/40 bg-amber-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md shadow-[0_0_10px_rgba(251,191,36,0.15)]">
                    {project.badge}
                  </span>
                )}

                {/* Floating action buttons */}
                <div className="absolute right-4 top-4 flex gap-2 opacity-100 md:opacity-0 transition-all duration-500 md:group-hover:opacity-100 z-25">

                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                      aria-label="View source code"
                    >
                      <svg width={18} height={18} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}

                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                      aria-label="View live site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative px-6 pt-6 pb-3 md:p-8 md:pb-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white transition-colors group-hover:text-zinc-200 md:text-2xl">
                    {project.title}
                  </h3>
                  <button
                    onClick={() => toggleCard(project.title)}
                    aria-expanded={!!expandedCards[project.title]}
                    aria-label={expandedCards[project.title] ? 'Hide project details' : 'Show project details'}
                    className="flex shrink-0 items-center gap-1 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    {expandedCards[project.title] ? 'Less' : 'Details'}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${expandedCards[project.title] ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    expandedCards[project.title] ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mb-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                      {project.description}
                    </p>

                    {/* Mini case study highlights */}
                    {project.highlights && (
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.highlights.map((h) => (
                          <span
                            key={h}
                            className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-700/50 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom glow line */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
