import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Terminal,
  Globe,
  Palette,
  Database,
  Cpu,
  GitBranch,
  Sparkles,
  Brain,
  Workflow,
} from 'lucide-react';

type ToolSize = 'small' | 'wide' | 'tall' | 'large';

interface Tool {
  name: string;
  category: string;
  icon: React.ElementType;
  size: ToolSize;
  description?: string;
}

const tools: Tool[] = [
  {
    name: 'Python',
    category: 'Language',
    icon: Code2,
    size: 'large',
    description: 'Scripting, backend systems, and rapid automation prototyping.',
  },
  {
    name: 'Claude',
    category: 'AI Assistant',
    icon: Brain,
    size: 'wide',
    description: 'Reasoning, advanced prompt engineering, and intelligent agent flows.',
  },
  {
    name: 'JavaScript',
    category: 'Language',
    icon: Terminal,
    size: 'small',
  },
  {
    name: 'HTML',
    category: 'Frontend',
    icon: Globe,
    size: 'small',
  },
  {
    name: 'Supabase',
    category: 'Database',
    icon: Database,
    size: 'tall',
    description: 'Postgres backend hosting, robust auth, and realtime database subscriptions.',
  },
  {
    name: 'n8n',
    category: 'Automation',
    icon: Workflow,
    size: 'wide',
    description: 'Visual event-driven pipelines and advanced API endpoint orchestration.',
  },
  {
    name: 'C',
    category: 'Language',
    icon: Cpu,
    size: 'small',
  },
  {
    name: 'CSS',
    category: 'Styling',
    icon: Palette,
    size: 'small',
  },
  {
    name: 'GitHub',
    category: 'Platform',
    icon: GitBranch,
    size: 'small',
  },
  {
    name: 'Codex',
    category: 'AI Assistant',
    icon: Sparkles,
    size: 'small',
  },
];

const sizeClasses: Record<ToolSize, string> = {
  small: 'col-span-1 row-span-1',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  large: 'col-span-2 row-span-2',
};

const StackBentoGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
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

      // Bento cards stagger from random positions
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: { amount: 0.5, from: 'random' },
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
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    el.style.transform = `perspective(1000px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            The Toolkit
          </p>
          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Stack that powers
            <br />
            <span className="text-zinc-400">the craft</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 auto-rows-[130px] sm:gap-4 md:grid-cols-4 md:auto-rows-[150px]"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isLarge = tool.size === 'large' || tool.size === 'tall';

            return (
              <div
                key={tool.name}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-5 backdrop-blur-md transition-[transform,box-shadow] duration-200 ease-out hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] ${sizeClasses[tool.size]}`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                {/* Ambient inner glow on hover */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent" />

                <div className="relative flex h-full flex-col justify-between">
                  {/* Top: Icon + Category */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300 ${isLarge ? 'h-10 w-10 md:h-12 md:w-12' : 'h-8 w-8 md:h-10 md:w-10'}`}
                    >
                      <Icon
                        size={isLarge ? 24 : 18}
                        strokeWidth={1.5}
                        className="transition-colors duration-300 group-hover:text-white"
                      />
                    </div>
                    <span className="rounded-full border border-zinc-700/40 bg-zinc-800/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 backdrop-blur-sm">
                      {tool.category}
                    </span>
                  </div>

                  {/* Bottom: Name + Description */}
                  <div>
                    <h3
                      className={`font-bold text-white ${isLarge ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}
                    >
                      {tool.name}
                    </h3>
                    {tool.description && (
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500 md:text-sm">
                        {tool.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom edge light */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StackBentoGrid;
