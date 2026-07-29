import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';
import MagneticButton from './MagneticButton';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const NotFound = () => {
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const els = [numberRef.current, textRef.current, btnRef.current].filter(
      Boolean
    );

    if (reducedMotion) {
      gsap.set(els, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      numberRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-zinc-800/10 blur-[120px]" />

      <div className="relative z-10 text-center">
        {/* Giant 404 */}
        <div ref={numberRef} className="relative mb-6 select-none">
          <h1 className="text-[8rem] font-bold leading-none tracking-tighter text-zinc-800 md:text-[12rem]">
            404
          </h1>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="text-[8rem] font-bold leading-none tracking-tighter text-transparent md:text-[12rem]"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
            >
              404
            </span>
          </div>
        </div>

        {/* Message */}
        <div ref={textRef} className="mb-10 space-y-3">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Lost in the void
          </h2>
          <p className="mx-auto max-w-md text-zinc-500">
            The page you're looking for doesn't exist in this dimension. It may
            have been moved, deleted, or never existed at all.
          </p>
        </div>

        {/* CTA */}
        <div ref={btnRef}>
          <MagneticButton
            as="a"
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            <ArrowLeft size={16} />
            Return to Base
          </MagneticButton>
        </div>
      </div>

      {/* Subtle scanline overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  );
};

export default NotFound;
