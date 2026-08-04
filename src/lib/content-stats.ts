import { articles } from "@/content/articles";
import { knowledgeManifest } from "@/content/knowledge/manifest";
import { archiveProjects, featuredProjects, projects } from "@/content/projects";
import { labEffects, labCategories } from "@/data/lab-effects";

/**
 * Public content inventory (Git-managed, not SQLite CMS).
 * Dashboard shows this so the "platform vs private panel" boundary is explicit.
 */
export function getContentInventory() {
  const categories = labCategories.filter((c) => c.id !== "all").map((c) => c.id);
  const labByCategory = Object.fromEntries(
    categories.map((id) => [id, labEffects.filter((e) => e.category === id).length]),
  ) as Record<string, number>;

  return {
    projects: {
      total: projects.length,
      featured: featuredProjects.length,
      archive: archiveProjects.length,
    },
    knowledge: {
      docs: knowledgeManifest.length,
      files: knowledgeManifest.map((d) => d.file),
    },
    lab: {
      total: labEffects.length,
      byCategory: labByCategory,
      inspired: labEffects.filter((e) => Boolean(e.source)).length,
      original: labEffects.filter((e) => !e.source).length,
    },
    articles: {
      total: articles.length,
      live: articles.filter((a) => a.status === "live").length,
    },
  };
}
