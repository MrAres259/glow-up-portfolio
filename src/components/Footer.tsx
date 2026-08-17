import { useLang } from "@/contexts/LanguageContext";
import { MapPin, Mail, Linkedin, Instagram } from "lucide-react";
import logoImg from "@/assets/Logo.png";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative z-10 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="RS" className="w-auto theme-logo transition-all duration-500" style={{ height: 40 }} />
              <span className="text-lg font-bold text-foreground">Rigel Santos</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Telecom Engineer & Technical Account Manager based in Mexico City.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="label-mono text-xs mb-4">
              {t.contact}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${t.email}`} className="hover:text-primary transition-colors" data-interactive>
                  {t.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t.location}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="label-mono text-xs mb-4">
              Social
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/miguel-rigel-santos-carpio-202a91172"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-interactive
              >
                <Linkedin className="w-4 h-4 text-foreground" />
              </a>
              <a
                href="https://www.instagram.com/mr.ares259?igsh=MWxxeGdrYmVzanE0MQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                data-interactive
              >
                <Instagram className="w-4 h-4 text-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-10 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Rigel Santos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
