import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { X, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  image: string;
}

interface ImageLightboxProps {
  certifications: Certification[];
  initialIndex: number;
  onClose: () => void;
}

const ImageLightbox = ({ certifications, initialIndex, onClose }: ImageLightboxProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button
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
      } else if (e.key === 'ArrowRight') {
        navigate('right');
      } else if (e.key === 'ArrowLeft') {
        navigate('left');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Initial scroll setup
    const initScroll = setTimeout(() => {
      if (swiperRef.current) {
        const itemWidth = swiperRef.current.clientWidth;
        swiperRef.current.scrollLeft = itemWidth * initialIndex;
      }
    }, 50);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(initScroll);
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  // Keep currentIndex updated during manual swipe / scroll snapping
  const handleScroll = () => {
    if (!swiperRef.current) return;
    const scrollLeft = swiperRef.current.scrollLeft;
    const clientWidth = swiperRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex >= 0 && newIndex < certifications.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const navigate = (direction: 'left' | 'right') => {
    if (!swiperRef.current) return;
    const clientWidth = swiperRef.current.clientWidth;
    const targetIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1) 
      : Math.min(certifications.length - 1, currentIndex + 1);

    swiperRef.current.scrollTo({
      left: clientWidth * targetIndex,
      behavior: 'smooth'
    });
  };

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl px-4 py-8 select-none"
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

      {/* Desktop Prev/Next controls */}
      {currentIndex > 0 && (
        <button
          onClick={() => navigate('left')}
          className="absolute left-6 z-[110] hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/80 bg-zinc-900/30 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white cursor-pointer"
          aria-label="Previous certificate"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {currentIndex < certifications.length - 1 && (
        <button
          onClick={() => navigate('right')}
          className="absolute right-6 z-[110] hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/80 bg-zinc-900/30 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white cursor-pointer"
          aria-label="Next certificate"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative flex max-w-5xl w-full flex-col items-center overflow-hidden"
      >
        {/* Scroll swiper track */}
        <div
          ref={swiperRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {certifications.map((cert) => (
            <div
              key={cert.credentialId}
              className="w-full shrink-0 snap-center flex flex-col items-center justify-center px-4"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-950/40 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-2xl w-full">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-[50vh] w-auto max-w-full mx-auto rounded-xl object-contain"
                  draggable={false}
                />
              </div>

              {/* Details Details */}
              <div className="mt-6 text-center max-w-xl px-4">
                <h4 className="text-lg font-bold text-white mb-1 tracking-tight line-clamp-2">
                  {cert.title}
                </h4>
                <p className="text-xs text-zinc-500 mb-4 font-semibold tracking-wide uppercase">
                  {cert.issuer} &bull; {cert.date}
                </p>

                <div className="flex items-center justify-center gap-3">
                  {cert.verifyUrl && cert.verifyUrl !== '#' && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-white"
                    >
                      Verify Credential
                      <ExternalLink size={12} />
                    </a>
                  )}
                  
                  <a
                    href={cert.image}
                    download={`${cert.title.replace(/\s+/g, '_')}_Certificate.png`}
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
          ))}
        </div>

        {/* Gallery Dot Indicators at the bottom */}
        <div className="flex gap-2.5 mt-4">
          {certifications.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.scrollTo({
                    left: swiperRef.current.clientWidth * index,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 bg-white' 
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageLightbox;
