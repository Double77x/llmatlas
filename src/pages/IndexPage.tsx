import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CommandMenu } from "@/components/CommandMenu";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { ToolList } from "@/components/ToolList";
import { useTools } from "@/hooks/useTools";
import { useUserVotes } from "@/hooks/useUserVotes";
import { Tool } from "@/lib/supabase";
import { Route } from "@/routes/index";

interface IndexPageProps {
  searchParams: {
    sortBy?: string;
    search?: string;
    activeType?: string;
    activePricing?: string;
    activeLicense?: string;
    page?: number;
    viewMode?: "paginated" | "continuous";
  };
}

export function IndexRouteComponent() {
  const searchParams = Route.useSearch();
  return <IndexPage searchParams={searchParams} />;
}

export default function IndexPage({ searchParams }: IndexPageProps) {
  const navigate = useNavigate({ from: Route.fullPath });

  const [search, setSearch] = useState(searchParams.search || "");
  const [debouncedSearch] = useDebounce(search, 300);

  // Sync URL search param back to local state (for CommandMenu etc) during render
  const [prevUrlSearch, setPrevUrlSearch] = useState(searchParams.search);
  if (searchParams.search !== prevUrlSearch) {
    setSearch(searchParams.search || "");
    setPrevUrlSearch(searchParams.search);
  }
  
  const sortBy = searchParams.sortBy || "rank";
  const activeType = searchParams.activeType || "All";
  const activePricing = searchParams.activePricing || "All";
  const activeLicense = searchParams.activeLicense || "All";
  const page = searchParams.page || 0;
  const viewMode = searchParams.viewMode || "paginated";

  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Sync debounced search to URL
  useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, search: debouncedSearch, page: 0 }), 
      replace: true,
    });
  }, [debouncedSearch, navigate]);

  // Handle setting filters via navigate
  const setSortBy = (val: string) => navigate({ search: (prev) => ({ ...prev, sortBy: val, page: 0 }) });
  const setActiveType = (val: string) => navigate({ search: (prev) => ({ ...prev, activeType: val, page: 0 }) });
  const setActivePricing = (val: string) => navigate({ search: (prev) => ({ ...prev, activePricing: val, page: 0 }) });
  const setActiveLicense = (val: string) => navigate({ search: (prev) => ({ ...prev, activeLicense: val, page: 0 }) });
  const setPage = (val: number) => navigate({ search: (prev) => ({ ...prev, page: val }) });
  const setViewMode = (val: "paginated" | "continuous") => navigate({ search: (prev) => ({ ...prev, viewMode: val, page: 0 }) });

  // Sticky Animation State
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Data Fetching
  const { 
    data, 
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useTools({
    sortBy,
    search: debouncedSearch,
    activeType,
    activePricing,
    activeLicense,
    page,
    viewMode
  });

  const { data: userVotes = [] } = useUserVotes();

  const tools = useMemo(() => {
    if (viewMode === "continuous" && data && "pages" in data) {
      return data.pages.flatMap((p) => p.data) || [];
    }
    const paginatedData = data as { data: Tool[]; count: number | null } | undefined;
    return paginatedData?.data || [];
  }, [data, viewMode]);

  const resultsCount = useMemo(() => {
    if (viewMode === "continuous" && data && "pages" in data) {
      return data.pages[0]?.count || 0;
    }
    const paginatedData = data as { data: Tool[]; count: number | null } | undefined;
    return paginatedData?.count || 0;
  }, [data, viewMode]);

  // Intersection Observer for FilterBar stickiness
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-10px 0px 0px 0px",
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleResetFilters = () => {
    setSearch("");
    navigate({
      search: (prev) => ({
        ...prev,
        sortBy: "rank",
        search: "",
        activeType: "All",
        activePricing: "All",
        activeLicense: "All",
        page: 0,
        viewMode: "paginated"
      }),
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 bg-background text-foreground">
      <SEO />
      <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />

      <Hero setIsCommandOpen={setIsCommandOpen} totalCount={resultsCount} />

      <main className="flex-1 bg-background relative">
        {/* SENTINEL */}
        <div ref={sentinelRef} className="absolute -top-[1px] h-px w-full opacity-0 pointer-events-none" />

        {/* STICKY FILTER BAR */}
        <div className="sticky top-0 z-30 w-full pointer-events-none">
          <FilterBar
            isStuck={isStuck}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            activeType={activeType}
            setActiveType={setActiveType}
            activePricing={activePricing}
            setActivePricing={setActivePricing}
            activeLicense={activeLicense}
            setActiveLicense={setActiveLicense}
            resultsCount={resultsCount}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>

        {/* CONTENT GRID */}
        <ToolList 
          tools={tools} 
          userVotes={userVotes}
          onReset={handleResetFilters} 
          isLoading={isLoading}
          totalCount={resultsCount}
          currentPage={page}
          setPage={setPage}
          viewMode={viewMode}
          hasNextPage={!!hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          searchQuery={debouncedSearch}
        />
      </main>

      <Footer />
    </div>
  );
}