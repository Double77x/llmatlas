import { useTheme } from "next-themes";
import { Command as CommandIcon, Sun, Moon } from "lucide-react";
import asciiArt from "@/data/llm-atlas.txt?raw";
import { SubmitToolDialog } from "./SubmitToolDialog";

interface HeroProps {
  setIsCommandOpen: (open: boolean) => void;
  totalCount: number;
}

export function Hero({ setIsCommandOpen, totalCount }: HeroProps) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <header className="relative border-b border-border bg-background pt-12 pb-24 overflow-hidden">
      {/* Background Diagonal Cross-Hatch */}
      <div className="absolute inset-0 bg-cross-hatch mask-[linear-gradient(to_bottom,black_40%,transparent_100%)] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Top Row: Aligned Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 mb-20">
          {/* Status Indicator */}
          <div className="flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-foreground bg-background border border-border px-4 h-10 shadow-[4px_4px_0px_0px_rgba(61,54,55,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-3 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-3"></span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary font-black">LIVE</span>
              <span className="text-border">/</span>
              <span>{totalCount} TOOLS INDEXED</span>
            </span>
          </div>

          {/* Top Right Action Buttons - Uniform Brutalist Style */}
          <div className="flex items-center gap-2">
            <SubmitToolDialog />

            {/* Search Button */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="group flex items-center gap-4 px-4 h-10 bg-background border border-border hover:border-primary/40 hover:bg-primary/5 transition-all shadow-[4px_4px_0px_0px_rgba(61,54,55,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] active:translate-x-px active:translate-y-px active:shadow-none text-muted-foreground hover:text-foreground"
            >
              <div className="flex items-center gap-2">
                <CommandIcon className="h-3.5 w-3.5" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                  SEARCH
                </span>
              </div>
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 bg-muted/20 px-1.5 font-mono text-[10px] font-medium border border-border/50 opacity-50">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 bg-background border border-border hover:border-primary/40 hover:bg-primary/5 transition-all shadow-[4px_4px_0px_0px_rgba(61,54,55,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] active:translate-x-px active:translate-y-px active:shadow-none group text-muted-foreground hover:text-foreground"
              aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            {/* ASCII Art */}
            <pre
              className="text-[0.45rem] sm:text-[0.7rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.3rem] leading-[1.0] text-foreground font-bold select-none pointer-events-none whitespace-pre overflow-visible tracking-tight opacity-90"
              style={{ fontFamily: "monospace", fontVariantLigatures: "none" }}>
              {asciiArt.trim()}
            </pre>
            <h1 className="sr-only">LLM ATLAS</h1>
          </div>

          {/* Subtext */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-12 border-t-2 border-foreground/10">
            <div className="max-w-2xl">
              <p className="text-lg md:text-2xl text-muted-foreground font-sans font-medium leading-relaxed">
                Registry of{" "}
                <span className="text-foreground font-bold italic underline decoration-primary/30 underline-offset-4 decoration-2">
                  agentic coding toolchains
                </span>
                . Ranked by the community, verified for the machine era.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}