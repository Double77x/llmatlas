import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useUserVotes() {
  return useQuery({
    queryKey: ["userVotes"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from("votes")
        .select("tool_id")
        .eq("user_id", session.user.id);

      if (error) throw error;
      return data.map((v) => v.tool_id);
    },
    // Don't refetch too often, maybe on window focus is fine
    staleTime: 1000 * 60 * 5, 
  });
}
