import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
} & (
  | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

const MagneticButton = ({
  children,
  strength = 0.3,
  className = '',
  as = 'button',
  ...props
}: MagneticProps) => {
  const elRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Respect reduced motion (early exit if user prefers no animation)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  if (as === 'a') {
    return (
      <a
        ref={elRef as any}
        className={`relative inline-flex items-center justify-center will-change-transform ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={elRef as any}
      className={`relative inline-flex items-center justify-center will-change-transform ${className}`}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
