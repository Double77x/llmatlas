```text
██╗     ██╗     ███╗   ███╗     █████╗ ████████╗██╗      █████╗ ███████╗
██║     ██║     ████╗ ████║    ██╔══██╗╚══██╔══╝██║     ██╔══██╗██╔════╝
██║     ██║     ██╔████╔██║    ███████║   ██║   ██║     ███████║███████╗
██║     ██║     ██║╚██╔╝██║    ██╔══██║   ██║   ██║     ██╔══██║╚════██║
███████╗███████╗██║ ╚═╝ ██║    ██║  ██║   ██║   ███████╗██║  ██║███████║
╚══════╝╚══════╝╚═╝     ╚═╝    ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝
```

> **The Definitive Registry for the Agentic Coding Era.** Explore, vote, and submit autonomous toolchains, AI-native IDEs, and CLI agents.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)

LLM Atlas is a community-driven directory designed to track the evolution of machine-centric development tools. From fully autonomous AI software engineers to advanced IDE extensions, the Atlas provides a verified, filterable index of the most critical infrastructure in the AI era.

## KEY FEATURES

- **Idempotent Voting**: Real-time, authenticated voting system to rank the most effective tools.
- **Deep-Linked Filtering**: Advanced filtering by platform (IDE, CLI, Web, API), pricing model, and license status.
- **Performance-First**: Optimized with server-side pagination, continuous scroll, and aggressive asset caching.
- **Brutalist Aesthetic**: A high-contrast, technical UI designed for developers and power users.
- **Secure Architecture**: Hardened Supabase backend with Row Level Security (RLS) and strict Content Security Policies.
- **LLM-Friendly**: Includes a machine-optimized `llms.txt` index for easy parsing by AI agents.

## TECH STACK

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## GETTING STARTED

### Prerequisites

- Node.js (v20 or higher)
- Supabase Project (for database and auth)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/llm-atlas.git
   cd llm-atlas
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development**

   ```bash
   pnpm dev
   ```

## PROJECT STRUCTURE

```text
src/
├── components/
│   ├── ui/             # Core Brutalist components
│   ├── Hero.tsx        # Technical header with ASCII art
│   ├── FilterBar.tsx   # Advanced query controls
│   ├── ToolList.tsx    # Hybrid pagination/infinite scroll list
│   └── CommandMenu.tsx # Ctrl+K Global Search
├── hooks/              # Custom TanStack logic
├── lib/                # Supabase client and shared constants
├── pages/              # Clean page implementations
├── routes/             # TanStack Router definitions
└── main.tsx            # Entry point
```

## SECURITY & SCALABILITY

- **Database**: Indexed for O(log N) sorting on `vote_count` and `created_at`.
- **Harden**: Strict CSP, HSTS, and Frame-protection headers implemented.
- **Privacy**: Anonymous Auth ensures unique voting without personal data collection.

## CONTRIBUTING

We welcome community submissions! You can suggest new tools directly via the **SUBMIT TOOL** portal in the application. For codebase contributions:

1. Fork the project
2. Create your feature branch (`git checkout -b feat/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to the branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

---

Built by **Dan** | [llmatlas.pages.dev](https://llmatlas.pages.dev)
