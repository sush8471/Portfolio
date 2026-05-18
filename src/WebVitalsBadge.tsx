import { useEffect, useState, useCallback } from 'react';
import { onLCP, onINP, onCLS, onFCP, onTTFB, type Metric } from 'web-vitals';

type VitalEntry = {
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
};

const VITAL_META: Record<
  string,
  { label: string; unit: string }
> = {
  LCP: { label: 'LCP', unit: 'ms' },
  CLS: { label: 'CLS', unit: '' },
  INP: { label: 'INP', unit: 'ms' },
  FCP: { label: 'FCP', unit: 'ms' },
  TTFB: { label: 'TTFB', unit: 'ms' },
};

const ratingColor = (rating: string): string => {
  switch (rating) {
    case 'good':
      return 'text-emerald-400';
    case 'needs-improvement':
      return 'text-amber-400';
    case 'poor':
      return 'text-rose-400';
    default:
      return 'text-zinc-500';
  }
};

const dotColor = (rating: string): string => {
  switch (rating) {
    case 'good':
      return 'bg-emerald-400';
    case 'needs-improvement':
      return 'bg-amber-400';
    case 'poor':
      return 'bg-rose-400';
    default:
      return 'bg-zinc-700';
  }
};

const formatValue = (name: string, value: number): string => {
  if (name === 'CLS') return value < 0.01 ? '0.00' : value.toFixed(2);
  return Math.round(value).toString();
};

const WebVitalsBadge = () => {
  const [vitals, setVitals] = useState<Record<string, VitalEntry>>({});

  const handleVital = useCallback(({ name, value, rating }: Metric) => {
    setVitals((prev) => ({
      ...prev,
      [name]: { value, rating: rating as VitalEntry['rating'] },
    }));
  }, []);

  useEffect(() => {
    onLCP(handleVital);
    onINP(handleVital);
    onCLS(handleVital);
    onFCP(handleVital);
    onTTFB(handleVital);
  }, [handleVital]);

  const entries = Object.entries(vitals).sort(
    ([a], [b]) =>
      Object.keys(VITAL_META).indexOf(a) -
      Object.keys(VITAL_META).indexOf(b)
  );

  if (entries.length === 0) {
    return (
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-700">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-700" />
        Measuring performance...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
        Core Web Vitals
      </span>
      {entries.map(([name, { value, rating }]) => {
        const meta = VITAL_META[name] || { label: name, unit: '' };
        return (
          <span
            key={name}
            className={`flex items-center gap-1.5 font-mono text-xs ${ratingColor(rating)}`}
            title={`${name}: ${value}${meta.unit} (${rating})`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dotColor(rating)}`} />
            <span className="text-zinc-500">{meta.label}</span>
            <span className="font-semibold text-zinc-300">
              {formatValue(name, value)}
              <span className="ml-0.5 text-[10px] font-normal text-zinc-600">
                {meta.unit}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default WebVitalsBadge;
