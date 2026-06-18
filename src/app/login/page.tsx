import { Suspense } from "react";
import { LoginPage } from "@/components/login/LoginPage";

export const metadata = {
  title: "登录",
};

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中…</div>}>
      <LoginPage />
    </Suspense>
  );
}
