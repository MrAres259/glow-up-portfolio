import { useState, useEffect, useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import BackgroundEffects from "@/components/BackgroundEffects";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Shield, Brain, LineChart, Database, Activity } from "lucide-react";

export default function InsaightProject() {
  const { t, lang } = useLang();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const flowSteps = [
    {
      title: t.insaightNl2Sql,
      desc: t.insaightNl2SqlDesc,
      icon: <Brain className="w-8 h-8 text-primary" />,
      image: "/insaight/1.png"
    },
    {
      title: t.insaightSemanticRouting,
      desc: t.insaightSemanticRoutingDesc,
      icon: <Activity className="w-8 h-8 text-primary" />,
      image: "/insaight/4.png"
    },
    {
      title: t.insaightSecurity,
      desc: t.insaightSecurityDesc,
      icon: <Shield className="w-8 h-8 text-primary" />,
      image: "/insaight/3.png"
    },
    {
      title: t.insaightSelfCorrection,
      desc: t.insaightSelfCorrectionDesc,
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      image: "/insaight/6.png"
    },
    {
      title: t.insaightResults,
      desc: t.insaightResultsDesc,
      icon: <LineChart className="w-8 h-8 text-primary" />,
      image: "/insaight/2.png"
    },
    {
      title: t.insaightAdmin,
      desc: t.insaightAdminDesc,
      icon: <Database className="w-8 h-8 text-primary" />,
      image: "/insaight/7.png"
    }
  ];

  useEffect(() => {
    let frame = 0;

    // A step stays active until the NEXT step's top crosses the anchor line, so it never
    // fades while still being read. Measured live, so any viewport / rotation / font size works.
    const update = () => {
      frame = 0;
      // Below lg the image panel is docked over the bottom 32vh; the readable area ends there.
      const reserved = window.innerWidth < 1024 ? window.innerHeight * 0.32 : 0;
      const anchor = (window.innerHeight - reserved) / 2;

      let next = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= anchor) next = i;
      });

      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 150;
      setActiveStep(atBottom ? flowSteps.length - 1 : next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lang, flowSteps.length]);

  return (
    <>
      <BackgroundEffects />
      <GrainOverlay />
      <CustomCursor />
      <Header />
      
      <main className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-16 min-h-screen z-10">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6 sm:mb-8 group font-medium">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t.insaightBack}
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 mb-10 lg:mb-24 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="index-numeral text-3xl sm:text-4xl">01</span>
                <p className="label-mono text-xs">// Case Study</p>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-foreground tracking-tight">
                {t.project1Title}
              </h1>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                {["Huawei Cloud MaaS", "DeepSeek-V4-Flash", "Serverless", "CCI 2.0", "FunctionGraph", "SMN SDK"].map((tag, i) => (
                  <span key={i} className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold border border-primary/20 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-base sm:text-xl md:text-2xl text-muted-foreground leading-relaxed text-justify">
                {t.insaightOverview}
              </p>
            </div>
            
            <div className="flex-1 w-full relative">
               <div 
                 className="glass rounded-2xl sm:rounded-3xl overflow-hidden aspect-video flex items-center justify-center p-1.5 sm:p-2 group shadow-[0_0_40px_hsl(var(--primary)/0.15)] cursor-zoom-in"
                 onClick={() => setSelectedImage("/insaight/5.png")}
               >
                 <img src="/insaight/5.png" alt="Insaight Dashboard Overview" className="rounded-xl sm:rounded-2xl w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105" />
               </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent my-10 sm:my-16"></div>

          <div className="mb-10 sm:mb-16 md:mb-24 max-w-2xl">
            <p className="label-mono text-xs mb-4">// How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 text-foreground">Interactive Workflow</h2>
            <p className="text-base sm:text-xl text-muted-foreground">Scroll down to see how InsAIght processes natural language into actionable intelligence.</p>
          </div>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-start relative">

            {/* Scrolling text. Comes first in DOM so the image panel below can sticky-dock to the
                viewport bottom on mobile/tablet; on lg the grid re-orders the panel back to col 1. */}
            <div className="flex flex-col gap-12 sm:gap-16 lg:gap-32 pb-8 lg:pb-32 pt-4 sm:pt-8 lg:pt-32">
               {flowSteps.map((step, idx) => (
                 <div 
                   key={`text-${idx}`} 
                   ref={(el) => stepRefs.current[idx] = el}
                   className={`transition-all duration-700 ease-out min-h-[40vh] md:min-h-[40vh] flex flex-col justify-center ${activeStep === idx ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4 md:translate-x-8'}`}
                 >
                   <div className="flex items-center gap-4 mb-4 sm:mb-6">
                     <span className="index-numeral text-2xl sm:text-3xl">0{idx + 1}</span>
                     <div className="p-3 sm:p-4 bg-primary/10 inline-flex rounded-xl sm:rounded-2xl border border-primary/20 shadow-inner">
                       {step.icon}
                     </div>
                   </div>
                   <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-foreground">{step.title}</h3>
                   <p className="text-base sm:text-xl text-muted-foreground leading-relaxed text-justify">
                     {step.desc}
                   </p>
                 </div>
               ))}
            </div>

            {/* Image panel: docked to the viewport bottom below lg, sticky left column on lg. */}
            <div className="sticky bottom-4 lg:bottom-auto lg:top-32 lg:order-first z-30 h-[32vh] lg:h-[60vh] w-full glass rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 p-2 lg:p-6 transition-all duration-500 shadow-2xl">
               {flowSteps.map((step, idx) => (
                  <div
                    key={`img-${idx}`}
                    className={`absolute inset-2 lg:inset-6 transition-all duration-700 ease-in-out flex flex-col items-center justify-between gap-2 lg:gap-4 ${activeStep === idx ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'}`}
                  >
                     <div
                       className="w-full flex-1 flex items-center justify-center overflow-hidden cursor-zoom-in"
                       onClick={() => setSelectedImage(step.image)}
                     >
                       <img
                         src={step.image}
                         alt={step.title}
                         className="max-w-full max-h-full object-contain shadow-2xl rounded-xl bg-black/20 transition-transform duration-500 hover:scale-105"
                       />
                     </div>
                     <div className="w-full glass p-2 lg:p-4 rounded-xl text-center shadow-lg">
                       <p className="label-mono text-[9px] sm:text-[10px] mb-0.5">0{idx + 1} / {String(flowSteps.length).padStart(2, "0")}</p>
                       <p className="font-bold text-foreground text-xs sm:text-sm lg:text-lg">{step.title}</p>
                     </div>
                  </div>
               ))}
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl" 
          />
        </div>
      )}
    </>
  );
}

