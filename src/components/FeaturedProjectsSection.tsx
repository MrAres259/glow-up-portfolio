import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import { Database, RadioTower, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedProjectsSection() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal(0.15);
  const { ref: parallaxRef } = useParallax(0.06);

  const projects = [
    {
      index: "01",
      title: t.project1Title,
      desc: t.project1Desc,
      tech: ["Huawei Cloud", "MaaS", "DeepSeek-V4-Flash", "SQL", "SMN", "Python"],
      link: "/project/insaight",
      Icon: Database,
    },
    {
      index: "02",
      title: t.project2Title,
      desc: t.project2Desc,
      tech: ["Huawei Cloud", "MaaS", "Elasticsearch", "DeepSeek-V4-Flash", "GLM 5.2", "FastAPI", "Next.js", "Python"],
      link: "/project/noli",
      Icon: RadioTower,
    },
  ];

  return (
    <section id="projects" className="relative z-10 px-6 md:px-16 py-24 snap-start">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <p
          className="label-mono text-xs mb-4 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          // Selected Work
        </p>
        <h2
          ref={parallaxRef as React.RefObject<HTMLHeadingElement>}
          className="text-4xl md:text-5xl xl:text-6xl font-black mb-16 text-foreground transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(calc(var(--parallax-y, 0px) + ${isVisible ? 0 : 20}px))`,
          }}
        >
          {t.projects}
        </h2>

        <div className="flex flex-col">
          {projects.map((project, i) => {
            const Icon = project.Icon;
            return (
              <Link
                key={i}
                to={project.link}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14 border-t border-border/50 last:border-b transition-all duration-500 relative hover:bg-foreground/[0.02] px-2 -mx-2 rounded-xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${(i + 1) * 150}ms`,
                }}
                data-interactive
              >
                <span className="index-numeral md:col-span-2 text-4xl md:text-5xl select-none">
                  {project.index}
                </span>

                <div className="md:col-span-7 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold text-foreground/70 bg-foreground/5 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 flex md:justify-end">
                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground/70 group-hover:text-primary transition-colors">
                    View Project
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
