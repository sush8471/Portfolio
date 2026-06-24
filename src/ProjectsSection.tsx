import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: 'ResumeDEX',
    description:
      'An automated AI-powered resume screening and optimization platform built to parse resumes against job descriptions and boost interview matching rates.',
    image: '/images/projects/resumedex.png',
    tags: ['Python', 'Claude', 'n8n', 'Supabase'],
    githubUrl: '#',
    liveUrl: 'https://resumedex.vercel.app/',
  },
  {
    title: 'ReplyDEX',
    description:
      'An intelligent AI engine for review management and customer support automation, generating context-aware and personalized responses.',
    image: '/images/projects/replydex.png',
    tags: ['n8n', 'Claude', 'Supabase', 'Python'],
    githubUrl: '#',
    liveUrl: 'https://replydex.vercel.app/',
  },
  {
    title: 'Flydexify',
    description:
      'A vibe-based AI music recommendation service that analyzes uploaded images and language preferences to discover matching songs.',
    image: '/images/projects/flydexify.png',
    tags: ['React', 'Supabase', 'Python', 'n8n'],
    githubUrl: '#',
    liveUrl: 'https://flydexify.vercel.app/',
  },
  {
    title: 'FlydexGPT',
    description:
      'A premium LLM conversational interface with customizable templates and multi-model support for specialized development queries.',
    image: '/images/projects/flydexgpt.png',
    tags: ['Python', 'Claude', 'Supabase', 'TypeScript'],
    githubUrl: '#',
    liveUrl: 'https://flydexgpt.vercel.app/',
  },
  {
    title: 'Flydex Nutrients Analyzer',
    description:
      'An AI-powered computer-vision application designed to analyze meal photos for instant nutritional insights with Harvard-certified precision.',
    image: '/images/projects/flydex-nutrients-analyzer.png',
    tags: ['Python', 'Claude', 'JavaScript', 'HTML'],
    githubUrl: '#',
    liveUrl: 'https://flydex-nutrients-analyzer.vercel.app/',
  },
  {
    title: 'Flydon Dashboard',
    description:
      'A real-time business intelligence and telemetry dashboard displaying operational stats, revenue metrics, and automated performance pipelines.',
    image: '/images/projects/flydon-dashboard.png',
    tags: ['React', 'Supabase', 'Tailwind', 'Python'],
    githubUrl: '#',
    liveUrl: 'https://flydon-dashboard.vercel.app/',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

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

      // Cards staggered reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            rotateX: 10,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
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
          className="flex overflow-x-auto md:grid md:grid-cols-2 gap-8 snap-x snap-mandatory scrollbar-none py-4 -mx-6 px-6 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="snap-start shrink-0 w-[290px] sm:w-[340px] md:w-auto md:shrink group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md transition-all duration-700 hover:border-zinc-700/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
              style={{ perspective: '1000px' }}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-zinc-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Floating action buttons */}
                <div className="absolute right-4 top-4 flex gap-2 opacity-100 md:opacity-0 transition-all duration-500 md:group-hover:opacity-100 z-25">

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
              <div className="relative p-6 md:p-8">
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-zinc-200 md:text-2xl">
                  {project.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {project.description}
                </p>

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
