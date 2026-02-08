import { useState, useEffect } from "react";
import { ExternalLink, Github, Lock, Unlock, Share2 } from "lucide-react";
import { Tool } from "@/lib/supabase";
import { useVote } from "@/hooks/useVote";
import { formatNumber } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ToolCardProps {
  tool: Tool;
  initialHasVoted: boolean;
  isHighlighted?: boolean;
}

const ToolCard = ({ tool, initialHasVoted, isHighlighted }: ToolCardProps) => {
  const [votes, setVotes] = useState(tool.vote_count);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [showMinusOne, setShowMinusOne] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: vote, isPending } = useVote();

  const isOpenSource = !!tool.github;

  // Sync state if props change (server updates)
  const [prevVoteCount, setPrevVoteCount] = useState(tool.vote_count);
  const [prevInitialHasVoted, setPrevInitialHasVoted] = useState(initialHasVoted);

  if (tool.vote_count !== prevVoteCount || initialHasVoted !== prevInitialHasVoted) {
    setVotes(tool.vote_count);
    setHasVoted(initialHasVoted);
    setPrevVoteCount(tool.vote_count);
    setPrevInitialHasVoted(initialHasVoted);
  }

  const toggleVote = () => {
    if (isPending || isProcessing) return;
    setIsProcessing(true);

    // Optimistic Update
    if (hasVoted) {
      setVotes((prev) => prev - 1);
      setHasVoted(false);
      setShowMinusOne(true);
      setShowPlusOne(false);
    } else {
      setVotes((prev) => prev + 1);
      setHasVoted(true);
      setShowPlusOne(true);
      setShowMinusOne(false);
    }

    vote(
      { toolId: tool.id },
      {
        onSettled: () => {
          // Keep button disabled for 500ms after request finishes for UX
          setTimeout(() => setIsProcessing(false), 500);
        },
        onError: () => {
          // Revert on error
          if (hasVoted) {
            setVotes((prev) => prev + 1);
            setHasVoted(true);
          } else {
            setVotes((prev) => prev - 1);
            setHasVoted(false);
          }
        },
      },
    );
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("search", tool.name);
    url.searchParams.delete("page"); // Clean up page param for sharing
    navigator.clipboard.writeText(url.toString());
    toast.success("Deep link copied to clipboard!");
  };

  useEffect(() => {
    if (showPlusOne) {
      const timer = setTimeout(() => setShowPlusOne(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showPlusOne]);

  useEffect(() => {
    if (showMinusOne) {
      const timer = setTimeout(() => setShowMinusOne(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showMinusOne]);

  return (
    <div 
      className={`p-4 md:p-6 transition-all group bg-card text-card-foreground border shadow-sm flex flex-row gap-4 md:gap-6 items-start ${
        isHighlighted 
          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20 shadow-[0_0_30px_-10px_rgba(255,129,99,0.3)]" 
          : "border-border hover:bg-accent/30"
      }`}
    >
      {/* Middle: Content */}
      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-lg md:text-2xl font-black tracking-tight uppercase group-hover:text-primary transition-colors leading-none mr-2">
            {tool.name}
          </h2>

          {/* Metadata Badges Group */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Type Badges */}
            {tool.types.map((type) => (
              <span
                key={type}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground bg-muted px-1.5 py-0.5 border border-border/50">
                {type}
              </span>
            ))}

            {/* Pricing Badge */}
            {tool.pricing && (
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 border ${
                  tool.pricing.toLowerCase() === "free"
                    ? "border-chart-3/30 text-chart-3 bg-chart-3/5"
                    : tool.pricing.toLowerCase() === "paid"
                      ? "border-primary/30 text-primary bg-primary/5"
                      : "border-chart-1/30 text-chart-1 bg-chart-1/5"
                }`}>
                {tool.pricing}
              </span>
            )}

            {/* License Badge */}
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 border flex items-center gap-1 ${
                isOpenSource
                  ? "border-muted-foreground/20 text-muted-foreground bg-muted/20"
                  : "border-muted-foreground/20 text-muted-foreground/70 bg-transparent"
              }`}>
              {isOpenSource ? (
                <>
                  <Unlock className="h-2.5 w-2.5" /> Open
                </>
              ) : (
                <>
                  <Lock className="h-2.5 w-2.5" /> Closed
                </>
              )}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-sans font-medium line-clamp-2 md:line-clamp-none">
          {tool.description}
        </p>

        {/* Tags Row */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-1">
                <span className="text-primary/60">#</span>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-6 pt-1">
          {tool.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${tool.name} website`}
              className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all">
              VISIT <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {tool.github && (
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${tool.name} source code on GitHub`}
              className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all">
              SOURCE <Github className="h-3 w-3" />
            </a>
          )}
          <button
            onClick={handleShare}
            aria-label={`Copy share link for ${tool.name}`}
            className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-all cursor-pointer"
          >
            SHARE <Share2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Right: Vote Button */}
      <div className="flex flex-col items-center justify-start min-w-16 md:min-w-20 relative">
        {showPlusOne && (
          <div
            className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 text-primary font-mono font-black text-xl md:text-2xl pointer-events-none select-none animate-in fade-out zoom-in-150 duration-1000 fill-mode-forwards"
            style={{
              transform: "rotate(-15deg) skew(-15deg)",
              animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
            +1
          </div>
        )}
        {showMinusOne && (
          <div
            className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 text-muted-foreground font-mono font-black text-xl md:text-2xl pointer-events-none select-none animate-in fade-out zoom-in-150 duration-1000 fill-mode-forwards"
            style={{
              transform: "rotate(15deg) skew(15deg)",
              animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}>
            -1
          </div>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleVote}
                disabled={isPending}
                aria-label={hasVoted ? `Remove vote for ${tool.name}` : `Vote for ${tool.name}`}
                className={`flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 border-2 transition-all duration-200 group/vote active:scale-95 ${
                  hasVoted
                    ? "bg-primary/5 border-primary text-primary shadow-[4px_4px_0px_0px_rgba(255,129,99,0.3)] -translate-x-0.5 -translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(255,129,99,0.4)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-x-0 active:translate-y-0"
                    : "border-border hover:border-primary/60 hover:bg-primary/5 text-muted-foreground hover:text-primary hover:shadow-[6px_6px_0px_0px_rgba(255,129,99,0.3)] hover:-translate-x-1 hover:-translate-y-1 active:shadow-none active:translate-x-0 active:translate-y-0"
                } ${isPending ? "opacity-70 cursor-wait" : ""}`}>
                <span
                  className={`text-xl md:text-2xl font-mono font-black leading-none tracking-tighter transition-colors ${hasVoted ? "text-primary" : "text-foreground"}`}>
                  {formatNumber(votes)}
                </span>
                <span
                  className={`text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-[0.2em] mt-1 md:mt-1.5 transition-colors ${hasVoted ? "text-primary/70" : "text-muted-foreground/50"}`}>
                  VOTES
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-foreground text-background font-mono font-bold uppercase tracking-widest text-[10px] rounded-none border-0">
              {votes.toLocaleString()} TOTAL VOTES
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ToolCard;