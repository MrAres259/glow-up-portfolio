import { useLang } from "@/contexts/LanguageContext";
import { ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useParallax } from "@/hooks/useParallax";
import googleUx from "@/assets/google_ux.png";
import googleIt from "@/assets/google_it.png";
import gitGithub from "@/assets/git_github.png";
import netAthon from "@/assets/net_athon.png";
import netBasics from "@/assets/net_basics.png";
import googleCloud from "@/assets/google_cloud.png";
import hcipCs from "@/assets/hcip_cs.png";

type CertSize = "xlarge" | "large" | "small";

interface Cert {
  title: string;
  issuer: string;
  date: string;
  image: string;
  url: string;
  size: CertSize;
  certNo?: string;
}

function FeaturedCard({ cert, delay, visible, featuredLabel, certDetails }: { cert: Cert; delay: number; visible: boolean; featuredLabel: string; certDetails: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cert.certNo) {
      navigator.clipboard.writeText(cert.certNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-8 group hover:border-primary/50 hover:shadow-[0_0_50px_hsl(var(--primary)/0.25)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden mb-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transitionDelay: `${delay}ms`,
      }}
      data-interactive
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img src={cert.image} alt={cert.title} className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 relative z-10" />
      <div className="text-center md:text-left relative z-10 flex-1">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4 border border-primary/30 tracking-wide">{featuredLabel}</div>
        <h3 className="text-2xl md:text-4xl font-black text-foreground mb-3 leading-tight">{cert.title}</h3>
        <p className="text-muted-foreground text-lg">{cert.issuer} · {cert.date}</p>
        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
          <p className="text-muted-foreground/70 text-sm font-mono tracking-wide select-text cursor-text" onClick={(e) => e.stopPropagation()}>{certDetails}</p>
          {cert.certNo && (
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
              title="Copy Certificate Number"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      <ExternalLink className="w-6 h-6 text-muted-foreground absolute top-6 right-6 opacity-70 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function LargeCard({ cert, delay, visible }: { cert: Cert; delay: number; visible: boolean }) {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl p-8 flex flex-col items-center justify-center gap-5 group hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden min-h-[280px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transitionDelay: `${delay}ms`,
      }}
      data-interactive
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img src={cert.image} alt={cert.title} className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 relative z-10" />
      <div className="text-center relative z-10">
        <h3 className="text-lg font-bold text-foreground mb-1">{cert.title}</h3>
        <p className="text-muted-foreground text-sm">{cert.issuer} · {cert.date}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function SmallCard({ cert, delay, visible }: { cert: Cert; delay: number; visible: boolean }) {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-2xl p-5 flex items-center gap-4 group hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)] hover:-translate-y-2 transition-all duration-700 relative overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1) rotate(0deg)"
          : "translateY(50px) scale(0.9) rotate(-2deg)",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      data-interactive
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img src={cert.image} alt={cert.title} className="w-14 h-14 md:w-16 md:h-16 object-contain shrink-0 group-hover:scale-110 transition-transform duration-500 relative z-10" />
      <div className="relative z-10 min-w-0">
        <h3 className="text-sm font-bold text-foreground leading-tight">{cert.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} · {cert.date}</p>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity relative z-10" />
    </a>
  );
}

export default function CertificationsSection() {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal(0.1);
  const { ref: parallaxRef } = useParallax(0.06);

  const certs: Cert[] = [
    { title: t.certHcip, issuer: "Huawei", date: "2026", image: hcipCs, url: "https://e.huawei.com/cn/talent/#/cert/certificate-verification", size: "xlarge", certNo: "010202602521810435131409" },
    { title: "Google Cloud Essentials", issuer: "Google Cloud", date: "2024", image: googleCloud, url: "https://www.skills.google/public_profiles/423a0a4c-eb10-4534-93b6-ab302b738f23/badges/2086098", size: "large" },
    { title: "Cisco Networking Basics", issuer: "Cisco", date: "2024", image: netBasics, url: "https://www.credly.com/badges/40cdeeb1-2ff9-4e9b-853c-24b11a001c9e", size: "large" },
    { title: "Google IT Support", issuer: "Coursera", date: "2023", image: googleIt, url: "https://www.credly.com/badges/0d8c4c4f-bb48-4310-be03-be1b26b8d6ca", size: "large" },
    { title: "Google UX Design Certificate", issuer: "Coursera", date: "Mar 2023", image: googleUx, url: "https://www.credly.com/badges/53475eec-f46d-44d5-b9bf-f61fff271c29", size: "small" },
    { title: "Cisco Learn-A-Thon 2025", issuer: "Cisco", date: "2025", image: netAthon, url: "https://www.credly.com/badges/40cdeeb1-2ff9-4e9b-853c-24b11a001c9e", size: "small" },
    { title: "Git & GitHub Essentials", issuer: "Microsoft", date: "2024", image: gitGithub, url: "https://www.credly.com/badges/58c004e9-65fc-4127-9da0-36bd323fa082", size: "small" },
  ];

  const xlarge = certs.filter((c) => c.size === "xlarge");
  const large = certs.filter((c) => c.size === "large");
  const small = certs.filter((c) => c.size === "small");

  return (
    <section id="certifications" className="relative z-10 px-6 md:px-16 py-24 snap-start">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <p
          className="label-mono text-xs mb-4 transition-all duration-700 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)" }}
        >
          // 04 — Credentials
        </p>
        <h2
          ref={parallaxRef as React.RefObject<HTMLHeadingElement>}
          className="text-4xl md:text-5xl xl:text-6xl font-black mb-16 text-foreground transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(calc(var(--parallax-y, 0px) + ${isVisible ? 0 : 20}px))`,
          }}
        >
          {t.certifications}
        </h2>

        {xlarge.map((cert, i) => (
          <FeaturedCard key={`xl-${i}`} cert={cert} delay={100} visible={isVisible} featuredLabel={t.featuredCert} certDetails={t.certHcipDetails} />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {large.map((cert, i) => (
            <LargeCard key={i} cert={cert} delay={(i + 1) * 150} visible={isVisible} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {small.map((cert, i) => (
            <SmallCard key={i} cert={cert} delay={(i + 4) * 150} visible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
