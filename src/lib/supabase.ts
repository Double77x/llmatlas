import { createClient } from "@supabase/supabase-js";

// These will be available after you set up your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables. Features will be disabled.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tool = {
  id: string;
  name: string;
  description: string;
  url: string;
  github: string | null;
  pricing: string;
  tags: string[];
  types: string[];
  vote_count: number;
  created_at: string;
};
