import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowUpRight, Send } from 'lucide-react';
import MagneticButton from './MagneticButton';
import WebVitalsBadge from './WebVitalsBadge';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/sush8471' },
  { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/sushant-chaudhary-aa062a231/' },
  { name: 'Twitter', icon: TwitterIcon, url: 'https://x.com/thats_5ush' },
  { name: 'Email', icon: Mail, url: 'mailto:sushantcha00123@gmail.com' },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 bg-black px-6 py-32 md:px-12 lg:px-24"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-zinc-800/20 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-zinc-800/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div
          ref={contentRef}
          className="grid gap-16 lg:grid-cols-2 lg:gap-24"
        >
          {/* Left Column - CTA */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              Let's Connect
            </p>
            <h2
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              Have a project
              <br />
              <span className="text-zinc-400">in mind?</span>
            </h2>
            <p className="mb-10 max-w-md text-lg leading-relaxed text-zinc-400">
              I'm currently open to new opportunities and collaborations.
              Whether you need a full-stack application, an interactive
              prototype, or just want to say hello — my inbox is always open.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                  aria-label={link.name}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/30 p-8 backdrop-blur-xl md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                    <Send size={28} className="text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-zinc-400">I'll get back to you shortly.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-zinc-400"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-zinc-400"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-zinc-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      className="w-full resize-none rounded-xl border border-zinc-800 bg-black/50 px-4 py-3 text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] disabled:opacity-70"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 border-t border-zinc-900 pt-10">
          <div className="mb-6 flex justify-start">
            <WebVitalsBadge />
          </div>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} Portfolio. Crafted with precision.
            </p>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                Resume
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                Colophon
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                Source
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
