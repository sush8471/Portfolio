import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Register ScrollTrigger so GSAP can use it
gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for the animated text overlays
  const text2Ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // ==========================================
    // 1. IMAGE PRELOADING
    // ==========================================
    const frameCount = 112;
    // IMPORTANT: Next.js serves static files from the `public` directory.
    // Ensure you have a `public/images` folder containing your frames named like:
    // ezgif-frame-001.jpg, ezgif-frame-002.jpg, ...
    const currentFrame = (index: number) => 
      `/images/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`; 

    const images: HTMLImageElement[] = [];
    const animationState = { frame: 0 };

    // Load all 112 images into memory to completely eliminate flickering
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // ==========================================
    // 2. RESPONSIVENESS (OBJECT-FIT: COVER)
    // ==========================================
    const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvasWidth: number, canvasHeight: number) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;
      
      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;
 
      if (imgRatio > canvasRatio) {
        // Image is proportionally wider than the canvas
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        // Image is proportionally taller than the canvas
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderImage = () => {
      const img = images[animationState.frame];
      if (!img) return;
      
      // Safety check: wait for image load if it somehow hasn't finished loading
      if (!img.complete) {
        img.onload = () => drawImageCover(context, img, canvas.width, canvas.height);
      } else {
        drawImageCover(context, img, canvas.width, canvas.height);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderImage(); // Re-render current frame with new dimensions
    };

    // Attach resize listener and set initial dimensions
    window.addEventListener("resize", handleResize);
    handleResize();

    // Render the very first frame as soon as it's loaded, checking cache status first
    if (images[0]) {
      if (images[0].complete) {
        renderImage();
      } else {
        images[0].onload = renderImage;
      }
    }

    // If reduced motion is active, skip all ScrollTrigger/scrub timelines
    if (reducedMotion) {
      const tl = gsap.timeline();
      tl.fromTo(text2Ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      return () => {
        window.removeEventListener("resize", handleResize);
        tl.kill();
      };
    }

    // ==========================================
    // 3. GSAP SCROLLTRIGGER FOR VIDEO (Bound to Hero section scroll)
    // ==========================================
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // '1' adds a slight smooth catch-up delay for premium feel
      }
    });

    // Animate the frame property from 0 to 111 (for 112 total frames)
    videoTl.to(animationState, {
      frame: frameCount - 1,
      snap: "frame", // Ensures we land on whole integer frames
      ease: "none", // Linear animation directly tied to scroll
      onUpdate: renderImage, // Draw the new frame on every scroll update
      duration: 1
    });

    // ==========================================
    // 4. PORTFOLIO TEXT OVERLAYS ANIMATION (Entrance + Scroll Scrub)
    // ==========================================
    
    // Smooth entrance animation on page load for the name overlay
    gsap.fromTo(text2Ref.current, 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    // Scroll trigger timeline for text transitions within the 200vh Hero container
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Fade out the text overlay towards the end of the Hero container (60% to 90% scroll)
    textTl.to(text2Ref.current, {
      opacity: 0,
      y: -25,
      duration: 0.4,
      immediateRender: false
    }, 0.6);

    // Cleanup listeners and triggers on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      videoTl.kill();
      textTl.kill();
    };
  }, [reducedMotion]);

  return (
    // 1. Container Section: 200vh track height for Hero presentation.
    <section ref={containerRef} className="relative h-[200vh] w-full">
      
      {/* 2. Sticky Canvas Wrapper: Locks in viewport while scrolling through this section only */}
      <div className="sticky top-0 left-0 w-screen h-[100dvh] overflow-hidden z-0 pointer-events-none">
        {/* The HTML5 Canvas drawing our sequential images */}
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
      
      {/* 3. Text Overlays layer (Sticky within the 200vh track) */}
      <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center pointer-events-none z-10">
        
        {/* Portfolio Details Overlay */}
        <div ref={text2Ref} className="absolute text-center opacity-0 text-white drop-shadow-2xl px-4 w-full max-w-[90%] sm:max-w-xl md:max-w-3xl">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-2 md:mb-4 tracking-tight leading-tight">
            Sushant Chaudhary
          </h2>
          <p className="text-base sm:text-lg md:text-2xl font-light mb-6 md:mb-8 text-zinc-300">
            Aspiring AI Developer & Student Builder
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 pointer-events-auto">
            <a href="https://github.com/sush8471" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors duration-300">
              <span className="sr-only">GitHub</span>
              <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sushant-chaudhary-aa062a231/" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
