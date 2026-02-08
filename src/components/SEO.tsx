import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  canonical?: string;
  type?: string;
}

export const SEO = ({
  title = "LLM ATLAS | Agentic Coding Toolchain Registry",
  description = "The definitive registry for the agentic coding era. Explore, vote, and submit autonomous toolchains, IDEs, and CLI agents.",
  image = "/logo.svg",
  url = "https://llmatlas.pages.dev",
  keywords = [
    "llm atlas",
    "agentic coding",
    "ai coding tools",
    "ai agents",
    "coding directory",
    "cursor alternative",
    "aider",
    "cline",
    "windsurf",
    "agentic ide",
    "gemini agent",
    "llm agents",
    "best coding agents",
    "best ai coding tools",
  ],
  canonical,
  type = "website",
}: SEOProps) => {
  const fullTitle = title === "LLM ATLAS | Agentic Coding Toolchain Registry" ? title : `${title} | LLM ATLAS`;
  const canonicalUrl = canonical || url;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "LLM ATLAS",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: description,
        url: url,
        image: `${url}${image}`,
        author: {
          "@type": "Organization",
          name: "LLM Atlas",
        },
      },
      {
        "@type": "WebSite",
        url: url,
        name: "LLM ATLAS",
        description: description,
        publisher: {
          "@type": "Organization",
          name: "LLM Atlas",
        },
      },
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="LLM Atlas" />
      <meta name="application-name" content="LLM ATLAS" />
      <meta name="apple-mobile-web-app-title" content="LLM ATLAS" />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="LLM Atlas" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@llmatlas" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};
