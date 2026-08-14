import { TodosManager } from "@/components/dashboard/TodosManager";
import { getSession } from "@/lib/auth";

export const metadata = { title: "待办" };

export default async function TodosPage() {
  const session = await getSession();
  const readOnly = session?.role === "demo";

  return (
    <div>
      <h1 className="text-2xl font-bold">共享待办</h1>
      <p className="mt-1 text-sm text-zinc-600">
        两个人共用的清单：约会、求职准备、站点改动都可以记在这里。
      </p>
      <div className="mt-6 max-w-2xl">
        <TodosManager readOnly={readOnly} />
      </div>
    </div>
  );
}
