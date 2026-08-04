import fs from "fs";
import path from "path";
import { featuredProjects } from "@/content/projects";
import { ProjectsSectionClient } from "./ProjectsSectionClient";

function resolveCover(cover?: string) {
  if (!cover) return null;
  const filePath = path.join(process.cwd(), "public", cover.replace(/^\//, ""));
  return fs.existsSync(filePath) ? cover : null;
}

export function ProjectsSection() {
  const items = featuredProjects.map((project) => ({
    project,
    cover: resolveCover(project.cover),
  }));

  return <ProjectsSectionClient items={items} />;
}
