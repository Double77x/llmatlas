import React from "react";
import { Link } from "@tanstack/react-router";
import { Github, Twitter, Terminal } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background pt-16 pb-8 text-xs uppercase tracking-[0.2em] font-mono">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-border shadow-[4px_4px_0px_0px_rgba(61,54,55,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)]">
                <Terminal className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">LLM ATLAS</span>
            </div>
            <p className="text-muted-foreground normal-case tracking-normal text-sm leading-relaxed max-w-sm">
              The definitive registry for the agentic coding era. Community-driven, machine-verified, and constantly
              evolving.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/double77x/llmatlas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border-2 border-border hover:border-primary hover:text-primary transition-all"
                aria-label="LLM Atlas GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border-2 border-border hover:border-primary hover:text-primary transition-all"
                aria-label="LLM Atlas Twitter Profile"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-black text-foreground border-b-2 border-primary w-fit pb-1 mb-6">Directory</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    search={{ sortBy: "rank", activeType: "All" }}
                    onClick={scrollToTop}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Top Rated
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    search={{ sortBy: "newest", activeType: "All" }}
                    onClick={scrollToTop}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    Newest
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    search={{ activeType: "CLI" }}
                    onClick={scrollToTop}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    CLI Agents
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-foreground border-b-2 border-primary w-fit pb-1 mb-6">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-muted-foreground/60">
            <span>© {new Date().getFullYear()} LLM ATLAS NODE 01</span>
            <span className="hidden md:block text-border">|</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-chart-3 animate-pulse" />
              <span className="text-[10px]">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <span className="hidden md:block text-border">|</span>
            <span className="text-[10px] font-black text-primary">BUILT BY DAN</span>
          </div>

          <div className="text-[10px] font-bold text-muted-foreground/40">BUILD VERSION: 1.0.0-STABLE</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
