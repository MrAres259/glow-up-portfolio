import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";

export default function EducationSection() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal(0.15);
  const { ref: parallaxRef } = useParallax(0.06);

  const items = [
    { index: "01", title: t.edu1Title, place: t.edu1Place, date: t.edu1Date, desc: t.edu1Desc },
    { index: "02", title: t.edu2Title, place: t.edu2Place, date: t.edu2Date, desc: t.edu2Desc },
  ];

  return (
    <section id="education" className="relative z-10 px-6 md:px-16 py-24 snap-start">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <p
          className="label-mono text-xs mb-4 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          // 03 — Foundations
        </p>
        <h2
          ref={parallaxRef as React.RefObject<HTMLHeadingElement>}
          className="text-4xl md:text-5xl xl:text-6xl font-black mb-16 text-foreground transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(calc(var(--parallax-y, 0px) + ${isVisible ? 0 : 20}px))`,
          }}
        >
          {t.education}
        </h2>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <div
              key={i}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start py-10 border-t border-border/50 last:border-b transition-all duration-500 hover:bg-foreground/[0.02] px-2 -mx-2 rounded-xl"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${(i + 1) * 150}ms`,
              }}
            >
              <span className="index-numeral md:col-span-2 text-4xl md:text-5xl select-none">
                {item.index}
              </span>

              <div className="md:col-span-7 flex flex-col gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-primary/90 font-medium text-sm">{item.place}</p>
                <p className="text-muted-foreground mt-1">{item.desc}</p>
              </div>

              <div className="md:col-span-3 flex md:justify-end">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase border border-primary/20 theme-date-badge">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
