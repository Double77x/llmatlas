import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Scale } from "lucide-react";
import Footer from "@/components/Footer";

export function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <header className="border-b border-border py-8">
        <div className="container-main flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> BACK TO ATLAS
          </Link>
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-primary" />
            <span className="text-sm font-mono font-bold uppercase tracking-[0.2em]">USAGE TERMS</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-20">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-tighter mb-12">
            Terms of Service
          </h1>
          
          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-mono font-bold uppercase text-foreground">01. Acceptable Use</h2>
              <p>
                LLM Atlas is a community resource. You agree not to use automated scripts to manipulate voting counts, scrape data for commercial resale without attribution, or submit fraudulent tool suggestions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-mono font-bold uppercase text-foreground">02. Voting System</h2>
              <p>
                Votes are intended to represent genuine user preference. We reserve the right to audit and remove suspicious voting patterns. One vote per tool per user is enforced via anonymous session tracking.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-mono font-bold uppercase text-foreground">03. Disclaimer</h2>
              <p>
                The tools listed in the Atlas are provided by third parties. We do not guarantee the safety, performance, or accuracy of any tool chain indexed here. Use at your own risk.
              </p>
            </section>

            <section className="space-y-4 pt-12 border-t border-border">
              <p className="text-xs font-mono uppercase tracking-widest">Last Updated: February 2026</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
