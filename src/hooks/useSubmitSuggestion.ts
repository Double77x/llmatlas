import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface SuggestionInput {
  name: string;
  url: string;
  description: string;
  github?: string;
  pricing: string;
  types: string[];
  tags: string[];
}

export function useSubmitSuggestion() {
  return useMutation({
    mutationFn: async (input: SuggestionInput) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      let userId = session?.user.id;
      
      if (!session) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        userId = data.user?.id;
      }

      const { error } = await supabase.from("suggestions").insert([
        {
          name: input.name,
          url: input.url,
          description: input.description,
          github: input.github,
          pricing: input.pricing,
          types: input.types,
          tags: input.tags,
          user_id: userId,
        },
      ]);

      if (error) throw error;
      return { success: true };
    },
  });
}