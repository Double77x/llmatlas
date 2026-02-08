import { useQuery, useInfiniteQuery, UseQueryResult, UseInfiniteQueryResult } from "@tanstack/react-query";
import { supabase, Tool } from "@/lib/supabase";

export const TOOLS_PER_PAGE = 10;

interface FetchResponse {
  data: Tool[];
  count: number | null;
}

export function useTools({
  sortBy,
  search,
  activeType,
  activePricing,
  activeLicense,
  page,
  viewMode,
}: {
  sortBy: string;
  search: string;
  activeType: string;
  activePricing: string;
  activeLicense: string;
  page: number;
  viewMode: "paginated" | "continuous";
}) {
  const fetchTools = async ({ pageParam = 0 }): Promise<FetchResponse> => {
    let query = supabase.from("tools").select("*", { count: "exact" });

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    if (activeType !== "All") {
      query = query.contains("types", [activeType]);
    }
    if (activePricing !== "All") {
      query = query.ilike("pricing", activePricing);
    }
    if (activeLicense !== "All") {
      if (activeLicense === "Open Source") {
        query = query.not("github", "is", null);
      } else {
        query = query.is("github", null);
      }
    }

    if (sortBy === "rank") {
      query = query.order("vote_count", { ascending: false });
    } else if (sortBy === "newest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("name", { ascending: true });
    }

    const from = pageParam * TOOLS_PER_PAGE;
    const to = from + TOOLS_PER_PAGE - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      throw error;
    }

    return { data: data as Tool[], count };
  };

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["tools", "infinite", sortBy, search, activeType, activePricing, activeLicense],
    queryFn: ({ pageParam }) => fetchTools({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * TOOLS_PER_PAGE;
      if (lastPage.count !== null && loadedCount < lastPage.count) {
        return allPages.length;
      }
      return undefined;
    },
    enabled: viewMode === "continuous",
    staleTime: 1000 * 60 * 5,
  });

  const paginatedQuery = useQuery({
    queryKey: ["tools", "paginated", sortBy, search, activeType, activePricing, activeLicense, page],
    queryFn: () => fetchTools({ pageParam: page }),
    enabled: viewMode === "paginated",
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  if (viewMode === "continuous") {
    return {
      data: infiniteQuery.data,
      isLoading: infiniteQuery.isLoading,
      fetchNextPage: infiniteQuery.fetchNextPage,
      hasNextPage: infiniteQuery.hasNextPage,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    };
  }

  return {
    data: paginatedQuery.data,
    isLoading: paginatedQuery.isLoading,
    fetchNextPage: () => {},
    hasNextPage: false,
    isFetchingNextPage: false,
  };
}
