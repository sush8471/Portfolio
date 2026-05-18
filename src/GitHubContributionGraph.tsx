import React, { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitCommit, Flame, Calendar, TrendingUp } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface GraphData {
  total: number;
  weeks: ContributionWeek[];
  streak: number;
  longestStreak: number;
  activeDays: number;
}

interface GitHubContributionGraphProps {
  username: string;
}

// Generate realistic mock data for demo/fallback purposes
const generateMockData = (): GraphData => {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  const totalDays = 53 * 7;
  let total = 0;
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let activeDays = 0;

  for (let w = 0; w < 53; w++) {
    const days: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (totalDays - (w * 7 + d)));
      const dateStr = date.toISOString().split('T')[0] || '';
      
      // Simulate realistic patterns: more activity on weekdays, random streaks
      const isWeekend = d === 0 || d === 6;
      const baseProbability = isWeekend ? 0.3 : 0.75;
      const hasActivity = Math.random() < baseProbability;
      
      let count = 0;
      let level = 0;
      
      if (hasActivity) {
        count = Math.floor(Math.random() * 12) + 1;
        if (count > 10) level = 4;
        else if (count > 6) level = 3;
        else if (count > 3) level = 2;
        else level = 1;
        
        total += count;
        tempStreak++;
        activeDays++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
      
      days.push({ date: dateStr, count, level });
    }
    weeks.push({ days });
  }
  
  // Calculate current streak from the end
  currentStreak = 0;
  outer: for (let w = weeks.length - 1; w >= 0; w--) {
    const week = weeks[w];
    if (!week) continue;
    for (let d = week.days.length - 1; d >= 0; d--) {
      const day = week.days[d];
      if (day && day.count > 0) {
        currentStreak++;
      } else {
        break outer;
      }
    }
  }

  return { total, weeks, streak: currentStreak, longestStreak, activeDays };
};

const GitHubContributionGraph: React.FC<GitHubContributionGraphProps> = ({ 
  username 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number; day: ContributionDay } | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Public contribution API (no auth required)
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const raw = await response.json();
        
        // Normalize API response into our format
        // The API typically returns: { contributions: [{ date, count, level }, ...] }
        const contributions: ContributionDay[] = raw.contributions || [];
        
        // Group into weeks (Sunday-start)
        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];
        
        contributions.forEach((day: ContributionDay, index: number) => {
          const date = new Date(day.date);
          const dayOfWeek = date.getDay(); // 0 = Sunday
          
          if (dayOfWeek === 0 && currentWeek.length > 0) {
            weeks.push({ days: currentWeek });
            currentWeek = [];
          }
          currentWeek.push(day);
          
          // Pad first week
          if (index === 0 && dayOfWeek !== 0) {
            const padding: ContributionDay[] = [];
            for (let i = 0; i < dayOfWeek; i++) {
              padding.push({ date: '', count: 0, level: 0 });
            }
            currentWeek = [...padding, ...currentWeek];
          }
        });
        
        if (currentWeek.length > 0) weeks.push({ days: currentWeek });
        
        // Calculate stats
        let total = 0;
        let activeDays = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        
        contributions.forEach((day: ContributionDay) => {
          total += day.count;
          if (day.count > 0) {
            activeDays++;
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
          } else {
            tempStreak = 0;
          }
        });
        
        // Current streak from end
        let streak = 0;
        for (let i = contributions.length - 1; i >= 0; i--) {
          const day = contributions[i];
          if (day && day.count > 0) {
            streak++;
          } else {
            break;
          }
        }
        
        setData({ total, weeks, streak, longestStreak, activeDays });
      } catch (error) {
        console.warn('GitHub API failed, using mock data:', error);
        setData(generateMockData());
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  useEffect(() => {
    if (!data) return;
    
    const ctx = gsap.context(() => {
      // Header animation
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

      // Stats cards stagger
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Graph reveal
      gsap.fromTo(
        graphContainerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: graphContainerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  const stats = useMemo(() => {
    if (!data) return [];
    return [
      { label: 'Total Contributions', value: data.total.toLocaleString(), icon: GitCommit },
      { label: 'Current Streak', value: `${data.streak} days`, icon: Flame },
      { label: 'Active Days', value: data.activeDays.toLocaleString(), icon: Calendar },
      { label: 'Longest Streak', value: `${data.longestStreak} days`, icon: TrendingUp },
    ];
  }, [data]);

  const monthLabels = useMemo(() => {
    if (!data) return [];
    const labels: { text: string; colIndex: number }[] = [];
    let lastMonth = -1;

    data.weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.days.find((d) => d.date);
      if (firstValidDay && firstValidDay.date) {
        const date = new Date(firstValidDay.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            text: date.toLocaleString('default', { month: 'short' }),
            colIndex: weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [data]);

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0: return 'bg-zinc-900/60 border border-zinc-800/40';
      case 1: return 'bg-zinc-700';
      case 2: return 'bg-zinc-500';
      case 3: return 'bg-zinc-300';
      case 4: return 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.25)]';
      default: return 'bg-zinc-900/60';
    }
  };

  const handleCellMouseMove = (e: React.MouseEvent, day: ContributionDay) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoveredCell({
      x: rect.left + rect.width / 2,
      y: rect.top,
      day,
    });
  };

  if (loading) {
    return (
      <section className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 rounded bg-zinc-800" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-zinc-900" />
              ))}
            </div>
            <div className="h-40 rounded-xl bg-zinc-900" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Open Source Activity
          </p>
          <h2
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Consistency is
            <br />
            <span className="text-zinc-400">the foundation</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all duration-500 hover:border-zinc-700/50"
            >
              <div className="mb-3 flex items-center gap-2 text-zinc-500">
                <stat.icon size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white md:text-3xl">
                {stat.value}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Graph Container */}
        <div
          ref={graphContainerRef}
          className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 backdrop-blur-md md:p-8"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">
              @{username}'s contribution graph
            </span>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-3 w-3 rounded-sm ${getLevelColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Scrollable Graph */}
          <div className="relative -mx-2 overflow-x-auto px-2 pb-2 scrollbar-hide">
            <div className="min-w-[750px]">
              {/* Month Header Row */}
              <div className="flex mb-2">
                <div className="mr-3 text-xs text-transparent select-none" aria-hidden="true">
                  <span>Mon</span>
                </div>
                <div className="flex flex-1 gap-[3px] text-xs text-zinc-500">
                  {data?.weeks.map((_, weekIndex) => {
                    const label = monthLabels.find((l) => l.colIndex === weekIndex);
                    return (
                      <div key={weekIndex} className="relative h-4 w-[10px] md:w-3">
                        {label && (
                          <span className="absolute left-0 top-0 whitespace-nowrap font-medium text-[11px] text-zinc-500">
                            {label.text}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Day labels & Weeks Grid */}
              <div className="flex">
                <div className="mr-3 flex flex-col justify-around py-1 text-xs text-zinc-600 select-none">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                
                {/* Weeks Grid */}
                <div className="flex flex-1 gap-[3px]">
                  {data?.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.days.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`h-[10px] w-[10px] rounded-sm transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-white/30 md:h-3 md:w-3 ${getLevelColor(day.level)}`}
                          onMouseMove={(e) => day.date && handleCellMouseMove(e, day)}
                          onMouseLeave={() => setHoveredCell(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Edge fade for scroll indication */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/50 to-transparent md:hidden" />
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && hoveredCell.day.date && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-white shadow-xl"
          style={{
            left: hoveredCell.x,
            top: hoveredCell.y - 40,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-semibold">
            {hoveredCell.day.count} contribution{hoveredCell.day.count !== 1 ? 's' : ''}
          </div>
          <div className="text-zinc-400">{hoveredCell.day.date}</div>
        </div>
      )}
    </section>
  );
};

export default GitHubContributionGraph;
