export const SITE = {
  name: "KI Docs",
  tagline: "Technische Wissensbasis",
  url: "https://ki-anleitungen.de",
  locale: "de-DE",
  author: "KI Docs Team",
} as const;

export const NAVIGATION = {
  main: [
    { label: "Anleitungen", href: "/guides/" },
    { label: "Modelle", href: "/modelle/" },
    { label: "Workflows", href: "/workflows/" },
    { label: "Troubleshooting", href: "/troubleshooting/" },
    { label: "Befehle", href: "/befehlslegende/" },
    { label: "Cheat-Sheet", href: "/cheat-sheet/" },
    { label: "Suche", href: "/suche/" },
  ],
  footer: {
    guides: [
      { label: "Docker", href: "/guides/docker/" },
      { label: "ComfyUI", href: "/guides/comfyui/" },
      { label: "DGX Server", href: "/guides/dgx/" },
      { label: "GPU Nutzung", href: "/guides/gpu/" },
    ],
    models: [
      { label: "Stable Diffusion", href: "/modelle/stable-diffusion/" },
      { label: "Flux", href: "/modelle/flux/" },
      { label: "LLMs", href: "/modelle/llm/" },
    ],
    legal: [
      { label: "Impressum", href: "/ueber/#impressum" },
      { label: "Datenschutz", href: "/ueber/#datenschutz" },
    ],
  },
} as const;
