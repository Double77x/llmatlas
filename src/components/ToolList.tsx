import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ToolCard from "@/components/ToolCard";
import { Tool } from "@/lib/supabase";
import { TOOLS_PER_PAGE } from "@/hooks/useTools";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ToolListProps {
  tools: Tool[];
  userVotes: string[];
  onReset: () => void;
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  setPage: (page: number) => void;
  viewMode: "paginated" | "continuous";
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  searchQuery?: string;
}

export function ToolList({
  tools,
  userVotes,
  onReset,
  isLoading,
  totalCount,
  currentPage,
  setPage,
  viewMode,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  searchQuery,
}: ToolListProps) {
  const { ref, inView } = useInView();
  const totalPages = Math.ceil(totalCount / TOOLS_PER_PAGE);

  useEffect(() => {
    if (inView && hasNextPage && viewMode === "continuous") {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, viewMode]);

  if (isLoading && tools.length === 0) {
    return (
      <div className="container-main pb-20 pt-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-40 bg-muted/20 animate-pulse rounded-none border border-border/50" />
          ))}
        </div>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-main pb-20 pt-6">
      <div className="grid grid-cols-1 gap-4">
        {tools.length > 0 ? (
          tools.map((tool) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              initialHasVoted={userVotes.includes(tool.id)} 
              isHighlighted={Boolean(searchQuery && tool.name.toLowerCase() === searchQuery.toLowerCase())}
            />
          ))
        ) : (
          <div className="p-20 text-center bg-card border border-border border-dashed shadow-sm">
            <h2 className="text-lg font-mono font-bold uppercase tracking-tight">No Records Found</h2>
            <p className="text-muted-foreground mt-2 text-sm font-sans">Adjust filters to broaden your search.</p>
            <button
              onClick={onReset}
              className="mt-6 px-6 py-2 bg-primary text-primary-foreground text-[10px] font-mono font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md">
              Reset Filters
            </button>
          </div>
        )}

        {/* Paginated Mode Controls */}
        {viewMode === "paginated" && totalPages > 1 && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border/40">
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Page {currentPage + 1} of {totalPages} <span className="mx-3 text-border">|</span> {totalCount} Records
            </div>
            
            <div className="flex gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center gap-2 px-4 h-10 border-2 border-border hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground disabled:cursor-not-allowed text-[10px] font-mono font-bold uppercase tracking-widest"
              >
                <ChevronLeft className="h-4 w-4" />
                PREV
              </button>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center gap-2 px-4 h-10 border-2 border-border hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground disabled:cursor-not-allowed text-[10px] font-mono font-bold uppercase tracking-widest"
              >
                NEXT
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Continuous Mode Loader */}
        {viewMode === "continuous" && (hasNextPage || isFetchingNextPage) && (
          <div ref={ref} className="py-12 flex flex-col items-center gap-4">
            {isFetchingNextPage ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">Loading Records...</span>
              </div>
            ) : (
              <div className="h-1 w-full bg-border/20" />
            )}
          </div>
        )}

        {viewMode === "continuous" && !hasNextPage && tools.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border/40 text-center">
            <span className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.3em]">End of Atlas Registry</span>
          </div>
        )}
      </div>
    </div>
  );
}
