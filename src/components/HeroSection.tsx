import { useRef, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import { ChevronRight, Cloud, Brain, Terminal, ShieldCheck, Database, Network } from "lucide-react";
import ParticleGlobe from "@/components/ParticleGlobe";

function InteractiveText({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        lettersRef.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
          const maxDist = 150;
          const s = dist < maxDist ? 1 + (1 - dist / maxDist) * 0.5 : 1;
          el.style.transform = `scale(${s})`;
        });
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <span ref={containerRef} className="inline">
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[i] = el; }}
          className="inline-block transition-transform duration-100 ease-out"
          style={{ transformOrigin: "center bottom" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

interface ChipData {
  label: string;
  Icon: typeof Cloud;
  position: string;
  factor: number;
  delay: number;
}

function FloatingChip({ label, Icon, position, factor, delay }: ChipData) {
  const { ref } = useParallax(factor);

  return (
    <a
      href="#projects"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      className={`group hidden md:flex absolute ${position} items-center justify-center w-11 h-11 rounded-full border border-foreground/15 bg-background/30 backdrop-blur-sm animate-float-slow transition-colors duration-300 ease-out hover:border-foreground/50 hover:bg-background/60 hover:shadow-[0_0_20px_hsl(var(--foreground)/0.2)]`}
      style={{
        transform: "translateY(var(--parallax-y, 0px))",
        animationDelay: `${delay}ms`,
      }}
      data-interactive
      aria-label={label}
      title={label}
    >
      <span className="flex items-center justify-center w-full h-full transition-transform duration-300 ease-out group-hover:scale-125 group-active:scale-100">
        <Icon className="w-5 h-5 text-foreground/70 transition-colors duration-300 group-hover:text-foreground" />
      </span>
    </a>
  );
}

export default function HeroSection() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal(0.1);
  const pinRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t.projects, href: "#projects" },
    { label: t.experience, href: "#experience" },
    { label: t.certifications, href: "#certifications" },
    { label: t.contact, href: "#contact" },
  ];

  const chips: ChipData[] = [
    { label: "Huawei Cloud", Icon: Cloud, position: "top-[13%] left-[5%]", factor: 0.05, delay: 0 },
    { label: "AI / LLM", Icon: Brain, position: "top-[12%] right-[6%]", factor: 0.09, delay: 600 },
    { label: "Python", Icon: Terminal, position: "top-[28%] left-[1%]", factor: 0.07, delay: 1200 },
    { label: "WAF Security", Icon: ShieldCheck, position: "top-[32%] right-[2%]", factor: 0.04, delay: 1800 },
    { label: "Elasticsearch", Icon: Database, position: "top-[46%] left-[-1%]", factor: 0.1, delay: 900 },
    { label: "Networking", Icon: Network, position: "top-[50%] right-[-1%]", factor: 0.06, delay: 1500 },
  ];

  return (
    // Pinned scroll stage: the section below stays stuck to the viewport for this
    // extra height, so the grow/explode animation finishes (and the dust holds for
    // a beat) before scrolling is allowed to reveal the next section. Taller on small
    // screens since a single touch-scroll flick covers far more distance than a wheel
    // tick, so the sequence needs more room to read as scrubbed rather than skipped.
    <div ref={pinRef} className="relative snap-start h-[260svh] sm:h-[220svh] md:h-[190svh]">
      <section ref={ref} className="sticky top-0 h-[100svh] flex flex-col items-center justify-center z-10 px-6 pt-24 pb-20 overflow-hidden">

        {/* 3D particle globe backdrop */}
        <div className="absolute inset-0 z-0">
          <ParticleGlobe pinRef={pinRef} />
        </div>

      {/* Floating tech chips */}
      <div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {chips.map((chip) => (
            <FloatingChip key={chip.label} {...chip} />
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center relative">

        {/* Eyebrow / coordinates label */}
        <p
          className="label-mono text-[11px] sm:text-xs mb-6 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          {t.location} · 19.4326°N, 99.1332°W
        </p>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase mb-8 transition-all duration-700 ease-out shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "100ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {t.unamGrad}
        </div>

        {/* Greeting */}
        <p
          className="text-muted-foreground text-lg sm:text-xl font-medium mb-4 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
        >
          {t.greeting}
        </p>

        {/* Name */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-tight mb-6 transition-all duration-700 ease-out text-foreground"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "250ms" }}
        >
          <InteractiveText text={t.name} />
        </h1>

        {/* Alias / Role */}
        <div
          className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-12 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "350ms" }}
        >
          <span className="text-xl sm:text-2xl font-semibold text-foreground/90">
            {t.alias}
          </span>
          <span className="hidden sm:inline-block text-primary/50 text-xl">•</span>
          <span className="text-xl sm:text-2xl font-medium text-muted-foreground">
            {t.role}
          </span>
        </div>

        {/* Navigation Links */}
        <div
          className="flex flex-wrap justify-center gap-4 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "450ms" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300 text-foreground font-medium"
              data-interactive
            >
              {link.label}
              <ChevronRight className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
            </a>
          ))}
        </div>

        </div>
      </section>
    </div>
  );
}
