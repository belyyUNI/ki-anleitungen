import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config/site";

export async function GET() {
  const guides = await getCollection("guides", ({ data }) => !data.draft);
  const models = await getCollection("modelle", ({ data }) => !data.draft);
  const workflows = await getCollection("workflows", ({ data }) => !data.draft);
  const troubleshooting = await getCollection("troubleshooting", ({ data }) => !data.draft);

  const items = [
    ...guides.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      link: `/guides/${g.id.replace(/\.md$/, "")}/`,
      pubDate: g.data.publishedAt,
      ...(g.data.updatedAt && { updatedDate: g.data.updatedAt }),
      categories: [g.data.topic, ...g.data.tags],
    })),
    ...models.map((m) => ({
      title: m.data.name,
      description: m.data.description,
      link: `/modelle/${m.id.replace(/\.md$/, "")}/`,
      pubDate: m.data.publishedAt,
      categories: [m.data.category, m.data.type, ...m.data.tags],
    })),
    ...workflows.map((w) => ({
      title: w.data.title,
      description: w.data.description,
      link: `/workflows/${w.id.replace(/\.md$/, "")}/`,
      pubDate: w.data.publishedAt,
      categories: [w.data.category, ...w.data.tags],
    })),
    ...troubleshooting.map((t) => ({
      title: t.data.title,
      description: t.data.problem,
      link: `/troubleshooting/${t.id.replace(/\.md$/, "")}/`,
      pubDate: t.data.publishedAt,
      categories: [t.data.category, ...t.data.tags],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.name,
    description: SITE.tagline,
    site: SITE.url,
    items,
    customData: `<language>de</language>`,
  });
}
