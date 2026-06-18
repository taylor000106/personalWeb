import { NotesManager } from "@/components/dashboard/NotesManager";

export const metadata = { title: "笔记" };

export default function NotesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">笔记</h1>
      <p className="mt-1 text-sm text-zinc-600">私人笔记，仅登录后可见。</p>
      <div className="mt-6">
        <NotesManager />
      </div>
    </div>
  );
}
