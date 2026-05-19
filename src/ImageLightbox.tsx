import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { X, Download, ExternalLink } from 'lucide-react';

interface ImageLightboxProps {
  image: string;
  title: string;
  issuer: string;
  verifyUrl: string;
  onClose: () => void;
}

const ImageLightbox = ({ image, title, issuer, verifyUrl, onClose }: ImageLightboxProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    closeBtnRef.current?.focus();

    // Check reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(containerRef.current, { opacity: 1, scale: 1 });
      } else {
        gsap.fromTo(overlayRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.35, ease: 'power2.out' }
        );
        gsap.fromTo(containerRef.current, 
          { opacity: 0, scale: 0.96 }, 
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.1)' }
        );
      }
    });

    // Close on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      onClose();
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: onClose
      });
    }
  };

  // Close on clicking backdrop/overlay itself
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl px-4 py-8 select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Close button with premium styling */}
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/80 bg-zinc-900/50 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white cursor-pointer"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Content wrapper */}
      <div
        ref={containerRef}
        className="relative flex max-w-4xl w-full flex-col items-center"
      >
        {/* Certificate Image Frame */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950/40 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <img
            src={image}
            alt={title}
            className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
            draggable={false}
          />
        </div>

        {/* Details & Action Caption */}
        <div className="mt-6 text-center px-4">
          <h4 className="text-lg font-bold text-white mb-1 tracking-tight">{title}</h4>
          <p className="text-sm text-zinc-500 mb-4 font-medium">{issuer}</p>

          <div className="flex items-center justify-center gap-3">
            {verifyUrl && verifyUrl !== '#' && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-white"
              >
                Verify Credential
                <ExternalLink size={12} />
              </a>
            )}
            
            <a
              href={image}
              download={`${title.replace(/\s+/g, '_')}_Certificate.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-white"
            >
              Download
              <Download size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageLightbox;
