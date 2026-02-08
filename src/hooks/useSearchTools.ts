import { useQuery } from "@tanstack/react-query";
import { supabase, Tool } from "@/lib/supabase";

export function useSearchTools(search: string) {
  return useQuery({
    queryKey: ["searchTools", search],
    queryFn: async () => {
      let query = supabase.from("tools").select("*").limit(10);

      if (search) {
        query = query.ilike("name", `%${search}%`);
      } else {
        // Default to showing top voted tools if no search
        query = query.order("vote_count", { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Tool[];
    },
    enabled: true, // Always enabled, even empty search returns top 10
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
