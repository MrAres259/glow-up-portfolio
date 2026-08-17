import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";


function ExperienceNode({ item, i, isVisible, t }: { item: any, i: number, isVisible: boolean, t: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="relative pl-8 md:pl-12 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${(i + 1) * 150}ms`,
      }}
    >
      <div className="absolute left-[-5px] md:left-[-5px] top-2 w-3 h-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_10px_hsl(var(--primary)/0.5)]"></div>
      
      <div className="flex flex-col mb-2">
        <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-1">{item.title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
          <p className="text-primary font-medium">{item.place}</p>
          <span className="hidden sm:block text-muted-foreground/30">•</span>
          <span className="text-muted-foreground text-sm font-medium">{item.date}</span>
        </div>
      </div>
      
      <div className="relative mt-2 flex flex-col items-start">
        <div 
          className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'max-h-[1500px]' : 'max-h-[3.2rem]'}`}
          style={{
            WebkitMaskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 50%, transparent 100%)',
            maskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }}
        >
          <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-1.5 text-justify">
            {Array.isArray(item.desc) ? (
              item.desc.map((point: string, idx: number) => (
                <li key={idx} className="leading-relaxed text-[15px]">{point}</li>
              ))
            ) : (
              <p className="text-[15px] text-justify">{item.desc}</p>
            )}
          </ul>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 group/btn flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
          data-interactive
        >
          <span className="relative overflow-hidden pb-0.5">
            {isExpanded ? t.showLess : t.showMore}
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"></span>
          </span>
          <span className="flex items-center justify-center w-4 h-4 rounded-full border border-border group-hover/btn:border-primary/50 group-hover/btn:bg-primary/5 transition-all duration-300">
            <svg 
              className={`w-2.5 h-2.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal(0.15);


  const items = [
    { title: t.exp1Title, date: t.exp1Date, place: t.exp1Place, desc: t.exp1Desc },
    { title: t.exp2Title, date: t.exp2Date, place: t.exp2Place, desc: t.exp2Desc },
    { title: t.exp3Title, date: t.exp3Date, place: t.exp3Place, desc: t.exp3Desc },
  ];

  const skillCategories = [
    {
      title: t.catCloud,
      skills: [
        { name: "Huawei Cloud", level: "advanced" },
        { name: "Google Cloud", level: "foundational" },
        { name: "Terraform", level: "core" },
        { name: "Docker & K8s", level: "core" },
        { name: "Serverless (FaaS)", level: "core" }
      ]
    },
    {
      title: t.catAiData,
      skills: [
        { name: "AI/LLM Integration", level: "core" },
        { name: "Agent Swarming", level: "core" },
        { name: "RAG Pipelines", level: "core" },
        { name: "Elasticsearch", level: "core" },
        { name: "PostgreSQL", level: "core" },
        { name: "GaussDB", level: "core" }
      ]
    },
    {
      title: t.catProgramming,
      skills: [
        { name: "Python", level: "core" },
        { name: "TypeScript", level: "core" },
        { name: "SQL", level: "core" },
        { name: "API Integration", level: "core" }
      ]
    },
    {
      title: t.catSecurity,
      skills: [
        { name: "WAF Pen Testing", level: "core" },
        { name: "Cloud Firewall", level: "core" },
        { name: "Enterprise Routing", level: "core" }
      ]
    }
  ];

  return (
    <section id="experience" className="relative z-10 px-6 md:px-16 py-24 snap-start">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12" ref={ref}>
        
        {/* Timeline Column */}
        <div className="lg:col-span-7">
          <p
            className="label-mono text-xs mb-4 transition-all duration-700 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
          >
            // 01 — Track Record
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-10 text-foreground transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {t.experience}
          </h2>
          
          <div 
            className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-700 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="absolute left-5 md:left-[31px] top-10 bottom-10 w-px bg-border theme-pour-line"></div>
            <div className="flex flex-col gap-8">
              {items.map((item, i) => (
                <ExperienceNode key={i} item={item} i={i} isVisible={isVisible} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Skills Column */}
        <div className="lg:col-span-5">
          <p
            className="label-mono text-xs mb-4 transition-all duration-700 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "100ms" }}
          >
            // 02 — Toolkit
          </p>
          <h2
            className="text-4xl md:text-5xl font-black mb-10 text-foreground transition-all duration-700 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}
          >
            {t.coreSkills}
          </h2>
          
          <div 
            className="glass rounded-3xl p-6 md:p-8 flex flex-col gap-10 h-auto transition-all duration-700 ease-out"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transitionDelay: "300ms" }}
          >
            {skillCategories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-5">
                <h3 className="text-[13px] font-bold tracking-[0.2em] text-primary uppercase border-b border-border/50 pb-3">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, j) => (
                    <span 
                      key={j} 
                      className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                        skill.level === 'advanced' 
                          ? 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_hsl(var(--primary)/0.15)] hover:shadow-[0_0_20px_hsl(var(--primary)/0.25)] hover:bg-primary/20'
                          : skill.level === 'foundational'
                          ? 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:text-foreground'
                          : 'bg-foreground/5 text-foreground/80 border border-border/50 hover:border-primary/40 hover:text-primary hover:bg-primary/5'
                      }`}
                      data-interactive
                    >
                      {skill.name}
                      {skill.level === 'advanced' && <span className="ml-1.5 text-primary">★</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
