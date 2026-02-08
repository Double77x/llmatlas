export const TOOL_TYPES = ["IDE", "CLI", "Web", "API"] as const;

export const PRICING_MODELS = ["Free", "Freemium", "Paid"] as const;

export const TOOL_TAGS = [
  "agentic", "api", "assistant", "autocomplete", "aws", "builder", "byok", "cascade", "chat", 
  "cloud-ide", "code-search", "codegen", "completion", "context", "deploy", "editor", 
  "enterprise", "extension", "extensions", "frontend", "full-stack", "generator", "git", 
  "jetbrains", "local", "model", "models", "open-source", "performance", "privacy", 
  "prototype", "router", "rust", "serve", "team", "teams", "terminal", "tools", "ui", 
  "vscode", "vscode-fork", "webcontainers", "anthropic", "google", "gemini", "autonomous",
  "planning", "automation", "indexing"
].sort();

export const SORT_OPTIONS = [
  { label: "Rank (Votes)", value: "rank" },
  { label: "Newest", value: "newest" },
  { label: "Name (A-Z)", value: "name" },
] as const;

export const LICENSE_OPTIONS = ["Open Source", "Closed Source"] as const;
