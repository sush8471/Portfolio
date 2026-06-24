import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryImage,
  StoryOverlay,
  StoryTitle,
} from '@/components/ui/stories-carousel';

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
        { opacity: 1, y: 0 }
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

      // Story Cards staggered reveal
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stories-trigger-container',
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

        {/* Stories carousel wrapper */}
        <div 
          className="stories-trigger-container w-full flex justify-center"
          data-lenis-prevent
          style={{ overscrollBehaviorY: 'auto', overscrollBehaviorX: 'contain' }}
        >
          <Stories className="max-w-full">
            <StoriesContent className="px-4">
              {projects.map((project, index) => (
                <Story
                  key={project.title}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className="aspect-[4/3] !w-[290px] sm:!w-[360px]"
                  onClick={() => {
                    if (project.liveUrl && project.liveUrl !== '#') {
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                >
                  <StoryImage alt={project.title} src={project.image} className="object-cover" />
                  
                  {/* Floating external link badge */}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <div className="absolute right-3.5 top-3.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black">
                      <ExternalLink size={14} />
                    </div>
                  )}

                  <StoryOverlay side="top" className="h-20 from-black/70 to-transparent z-10" />
                  <StoryOverlay side="bottom" className="h-28 from-black/90 to-transparent z-10" />
                  
                  {/* Title overlay */}
                  <StoryTitle className="font-extrabold text-base sm:text-lg text-white pr-8 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
                    {project.title}
                  </StoryTitle>

                  {/* Project description snippet */}
                  <div className="absolute top-12 left-3 right-3 text-[11px] sm:text-xs text-zinc-300 font-medium line-clamp-3 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-10">
                    {project.description}
                  </div>

                  {/* Author / Tech Stack row */}
                  <StoryAuthor className="z-10">
                    <StoryAuthorImage
                      fallback={project.tags[0]?.substring(0, 2).toUpperCase()}
                      name={project.tags[0]}
                      className="border-white/40 shadow-sm"
                    />
                    <StoryAuthorName className="text-zinc-200 text-xs font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] truncate">
                      {project.tags.join(' • ')}
                    </StoryAuthorName>
                  </StoryAuthor>
                </Story>
              ))}
            </StoriesContent>
          </Stories>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
