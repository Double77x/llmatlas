import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Shield } from "lucide-react";
import Footer from "@/components/Footer";

export function PrivacyPage() {
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
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-mono font-bold uppercase tracking-[0.2em]">PRIVACY PROTOCOL</span>
          </div>
        </div>
      </header>

      <main className="flex-1 py-20">
        <div className="container-main max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black font-mono uppercase tracking-tighter mb-12">
            Privacy Policy
          </h1>
          
          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-mono font-bold uppercase text-foreground">01. Data Collection</h2>
              <p>
                LLM Atlas is designed to be as anonymous as possible. We do not require account creation for browsing or voting. We use Supabase Anonymous Auth to assign a temporary unique identifier to your browser session, allowing us to prevent vote manipulation without collecting personal identity data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-mono font-bold uppercase text-foreground">02. Cookies & Tracking</h2>
              <p>
                We use essential cookies and local storage to maintain your anonymous session and track which tools you have voted for. We do not use third-party advertising trackers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-mono font-bold uppercase text-foreground">03. Suggestions</h2>
              <p>
                If you submit a tool suggestion, the information provided (Tool Name, URL, Description) becomes public if approved. Your anonymous user ID is linked to the submission for moderation purposes.
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
