import { createLazyFileRoute } from "@tanstack/react-router";
import IndexPage, { IndexRouteComponent } from "@/pages/IndexPage";

export const Route = createLazyFileRoute("/")({
  component: IndexRouteComponent,
});