import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import StickyNav from './StickyNav';
import ScrollVideoComponent from './ScrollVideoComponent';
import AboutSection from './AboutSection';
import StackBentoGrid from './StackBentoGrid';
import GitHubContributionGraph from './GitHubContributionGraph';
import ProjectsSection from './ProjectsSection';
import CertificationsSection from './CertificationsSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import NoiseOverlay from './NoiseOverlay';
import { ResumeViewerProvider } from './ResumeViewerContext';
import ResumeViewer from './ResumeViewer';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    if (!reducedMotion) {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1,
          syncTouch: true,
        });
      }

      if (lenis) {
        lenisRef.current = lenis;

        // Bridge Lenis → ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Bridge GSAP ticker → Lenis
        rafCallback = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);

        // Critical: disable lag smoothing so ScrollTrigger stays locked
        gsap.ticker.lagSmoothing(0);
      }
    }

    // Refresh after layout settles
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <main className="relative bg-black text-white antialiased selection:bg-white/20 selection:text-white">
      {/* Lenis base styles */}
      <style>{`
        html.lenis, html.lenis body {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        *:focus-visible {
          outline: 2px solid rgba(255,255,255,0.3);
          outline-offset: 2px;
          border-radius: 4px;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <ResumeViewerProvider>
        <StickyNav />
        <NoiseOverlay />
        <ScrollVideoComponent />
        <AboutSection />
        <StackBentoGrid />
        <CertificationsSection />
        <GitHubContributionGraph username="sush8471" />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
        <ResumeViewer />
      </ResumeViewerProvider>
    </main>
  );
}

export default App;
