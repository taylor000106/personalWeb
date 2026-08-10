import fs from "fs";
import path from "path";
import { archiveProjects } from "@/content/projects";
import { ArchiveSectionClient } from "./ArchiveSectionClient";

function resolveCover(cover?: string) {
  if (!cover) return null;
  const filePath = path.join(process.cwd(), "public", cover.replace(/^\//, ""));
  return fs.existsSync(filePath) ? cover : null;
}

export function ArchiveSection() {
  const items = archiveProjects.map((project) => ({
    project,
    cover: resolveCover(project.cover),
  }));

  if (!items.length) return null;
  return <ArchiveSectionClient items={items} />;
}
