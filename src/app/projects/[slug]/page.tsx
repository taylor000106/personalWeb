import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabShell } from "@/components/lab/LabShell";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { getAllProjectSlugs, getProject } from "@/content/projects";

type PageProps = { params: Promise<{ slug: string }> };

function resolvePublic(src?: string) {
  if (!src) return null;
  const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  return fs.existsSync(filePath) ? src : null;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} · Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cover = resolvePublic(project.cover);
  const gallery = (project.gallery || [])
    .map((item) => ({ ...item, src: resolvePublic(item.src) }))
    .filter((item): item is { src: string; caption?: string } => Boolean(item.src))
    .filter((item) => item.src !== cover);

  return (
    <LabShell>
      <ProjectDetailView project={project} cover={cover} gallery={gallery} />
    </LabShell>
  );
}
