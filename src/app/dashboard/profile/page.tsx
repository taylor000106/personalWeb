import { ProfileForm } from "@/components/dashboard/ProfileForm";

export const metadata = { title: "资料" };

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">个人资料</h1>
      <p className="mt-1 text-sm text-zinc-600">可在此保存展示用信息（未来可接到公开页）。</p>
      <div className="mt-6 max-w-lg">
        <ProfileForm />
      </div>
    </div>
  );
}
