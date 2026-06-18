import { LinksManager } from "@/components/dashboard/LinksManager";

export const metadata = { title: "链接" };

export default function LinksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">收藏链接</h1>
      <p className="mt-1 text-sm text-zinc-600">保存你常用的网站。</p>
      <div className="mt-6">
        <LinksManager />
      </div>
    </div>
  );
}
