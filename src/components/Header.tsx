import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import logoImg from "@/assets/Logo.png";

export default function Header() {
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("light");
    setIsLight(!isLight);
  };

  const sections = [
    { label: t.projects, href: "#projects" },
    { label: t.experience, href: "#experience" },
    { label: t.education, href: "#education" },
    { label: t.certifications, href: "#certifications" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] glass px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" data-interactive>
          <img src={logoImg} alt="RS Logo" className="w-auto theme-logo transition-all duration-500" style={{ height: 48 }} />
          <span className="hidden sm:block label-mono text-[10px] leading-tight opacity-70">
            Telecom<br />× Cloud
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1 glass rounded-full grayscale"
            data-interactive
            aria-label="Toggle Theme"
          >
            {isLight ? "🌙" : "☀️"}
          </button>
          <button
            onClick={toggleLang}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1 glass rounded-full"
            data-interactive
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 group"
            data-interactive
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[99] bg-background/95 backdrop-blur-xl flex items-center justify-center transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <Link
              key={s.href}
              to={`/${s.href}`}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-6 text-4xl md:text-6xl font-bold text-foreground hover:text-primary transition-colors"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.4s ease-out",
              }}
              data-interactive
            >
              <span className="label-mono text-sm font-light opacity-60">0{i + 1}</span>
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
