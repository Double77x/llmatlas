import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ toolId }: { toolId: string }) => {
      // Ensure user is signed in (anonymously)
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
      }

      const { data, error } = await supabase.rpc("toggle_vote", {
        target_tool_id: toolId,
      });

      if (error) throw error;
      
      if (data && typeof data === 'object' && 'error' in data) {
        throw new Error(String((data as { error: string }).error));
      }

      return data; // { status: 'added' | 'removed' }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tools"] });
      queryClient.invalidateQueries({ queryKey: ["userVotes"] });
    },
  });
}
