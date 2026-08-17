import { useLang } from "@/contexts/LanguageContext";
import { MapPin, Mail, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

export default function ContactSection() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal(0.15);
  const { ref: parallaxRef } = useParallax(0.06);

  const items = [
    { icon: MapPin, label: t.location, href: null },
    { icon: Mail, label: t.email, href: `mailto:${t.email}` },
    { icon: Linkedin, label: t.linkedin, href: "https://www.linkedin.com/in/miguel-rigel-santos-carpio-202a91172" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mr.ares259?igsh=MWxxeGdrYmVzanE0MQ==" },
  ];

  return (
    <section id="contact" className="relative z-10 px-6 md:px-16 py-32 md:py-40 snap-start">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <p
          className="label-mono text-xs mb-6 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          // 05 — {t.contact}
        </p>

        <h2
          ref={parallaxRef as React.RefObject<HTMLHeadingElement>}
          className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-foreground leading-[1.05] mb-8 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(calc(var(--parallax-y, 0px) + ${isVisible ? 0 : 20}px))`,
          }}
        >
          {t.buildFuture}
        </h2>

        <p
          className="text-xs md:text-sm font-semibold tracking-[0.25em] text-primary uppercase mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "100ms",
          }}
        >
          {t.motto}
        </p>

        <div className="flex flex-col">
          {items.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            const extraProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Wrapper
                key={i}
                {...extraProps}
                className="group flex items-center justify-between gap-4 py-6 border-t border-border/50 last:border-b transition-all duration-500 hover:bg-foreground/[0.02] px-2 -mx-2 rounded-xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${(i + 1) * 100 + 150}ms`,
                }}
                data-interactive
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </div>
                {item.href && (
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
