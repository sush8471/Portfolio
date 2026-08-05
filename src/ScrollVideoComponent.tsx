import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { scrollToSection } from "./scrollToSection";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // ── Canvas scroll-video ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 112;
    const currentFrame = (index: number) =>
      `/images/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const animationState = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const drawImageCover = (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement,
      canvasWidth: number,
      canvasHeight: number
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderImage = () => {
      const img = images[animationState.frame];
      if (!img) return;

      if (!img.complete) {
        img.onload = () =>
          drawImageCover(context, img, canvas.width, canvas.height);
      } else {
        drawImageCover(context, img, canvas.width, canvas.height);
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderImage();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    if (images[0]) {
      if (images[0].complete) {
        renderImage();
      } else {
        images[0].onload = renderImage;
      }
    }

    if (reducedMotion) {
      // Show last frame for static experience
      animationState.frame = frameCount - 1;
      const lastFrame = images[frameCount - 1];
      if (lastFrame) {
        lastFrame.onload = renderImage;
        if (lastFrame.complete) renderImage();
      }
      gsap.set(scrollHintRef.current, { opacity: 0 });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    videoTl.to(animationState, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: renderImage,
      duration: 1,
    });

    // Scroll hint fades as user starts scrolling the film
    gsap.fromTo(
      scrollHintRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" }
    );

    const hintTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "15% top",
        scrub: true,
      },
    });
    hintTl.to(scrollHintRef.current, { opacity: 0, y: -12, ease: "none" });

    return () => {
      window.removeEventListener("resize", handleResize);
      videoTl.kill();
      hintTl.kill();
    };
  }, [reducedMotion]);

  // ── Intro identity block reveal (below video) ────────────────────
  useEffect(() => {
    if (!introContentRef.current) return;

    const items = introContentRef.current.querySelectorAll("[data-intro]");

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, introRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      {/* ── Cinematic portrait film ── */}
      <section
        ref={containerRef}
        className="relative h-[220vh] w-full bg-black"
        aria-label="Cinematic portrait"
      >
        <div className="sticky top-0 left-0 z-0 h-[100dvh] w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
            aria-hidden="true"
          />

          {/* Soft bottom vignette into next section */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"
            aria-hidden="true"
          />

          {/* Scroll cue — pure film, no copy on the portrait */}
          <div
            ref={scrollHintRef}
            className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 opacity-0"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400">
              Scroll
            </span>
            <span className="block h-8 w-px bg-gradient-to-b from-zinc-400/80 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Identity intro — sits fully below the film ── */}
      <section
        ref={introRef}
        className="relative z-10 -mt-px bg-black px-6 pb-20 pt-10 md:px-12 md:pb-28 md:pt-16 lg:px-24"
        aria-label="Introduction"
      >
        <div
          ref={introContentRef}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <p
            data-intro
            className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-zinc-500 md:mb-6"
          >
            AI Developer · Student Builder
          </p>

          <h1
            data-intro
            className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Sushant Chaudhary
          </h1>

          <p
            data-intro
            className="mb-4 max-w-2xl text-base font-light leading-relaxed text-zinc-300 sm:text-lg md:mb-5 md:text-2xl"
          >
            Building production-ready apps with a modern stack
          </p>

          <p
            data-intro
            className="mb-10 max-w-xl text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 sm:text-xs md:mb-12 md:tracking-[0.22em]"
          >
            2 full products shipped · AI prototypes &amp; wrappers
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            IBM, Oracle &amp; Anthropic certified
          </p>

          <div data-intro className="flex items-center gap-4">
            <a
              href="https://github.com/sush8471"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/sushant-chaudhary-aa062a231/"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#projects");
              }}
              className="ml-1 rounded-full border border-zinc-700 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] md:px-7"
            >
              View Work
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
