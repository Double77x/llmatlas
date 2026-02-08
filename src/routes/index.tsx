import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  sortBy: z.string().optional().catch("rank"),
  search: z.string().optional().catch(""),
  activeType: z.string().optional().catch("All"),
  activePricing: z.string().optional().catch("All"),
  activeLicense: z.string().optional().catch("All"),
  page: z.number().optional().catch(0),
  viewMode: z.enum(["paginated", "continuous"]).optional().catch("paginated"),
});

export const Route = createFileRoute("/")({
  validateSearch: (search) => searchSchema.parse(search),
});
