import { SiteHeader } from "@/components/layout/SiteHeader";

export function LabShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05050c] text-white">
      <SiteHeader />
      {children}
    </div>
  );
}
