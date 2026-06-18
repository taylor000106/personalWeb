"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { LoginCharacters } from "./LoginCharacters";
import styles from "./login.module.css";

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/dashboard";

  const [isTyping, setIsTyping] = useState(false);
  const [passwordLen, setPasswordLen] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [lookingAtEachOther, setLookingAtEachOther] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerLookAtEachOther = useCallback(() => {
    setLookingAtEachOther(true);
    setTimeout(() => setLookingAtEachOther(false), 800);
  }, []);

  const onFocusField = () => {
    setIsTyping(true);
    triggerLookAtEachOther();
  };

  const onBlurField = () => setIsTyping(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const remember = form.get("remember") === "on";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "登录失败");
        return;
      }
      router.push(from.startsWith("/") ? from : "/dashboard");
      router.refresh();
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <LoginCharacters
        isTyping={isTyping}
        passwordLen={passwordLen}
        showPassword={showPassword}
        lookingAtEachOther={lookingAtEachOther}
      />
      <div className={styles.right}>
        <div className={styles.formBox}>
          <div className={styles.header}>
            <h1>欢迎回来！</h1>
            <p>请输入你的登录信息</p>
          </div>
          {error ? <div className={styles.error}>{error}</div> : null}
          <form onSubmit={onSubmit}>
            <div className={styles.field}>
              <label htmlFor="email">邮箱</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="username"
                required
                onFocus={onFocusField}
                onBlur={onBlurField}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">密码</label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  onFocus={onFocusField}
                  onBlur={onBlurField}
                  onInput={(e) => setPasswordLen(e.currentTarget.value.length)}
                />
                <button
                  type="button"
                  className={styles.togglePw}
                  aria-label="切换密码可见性"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20} height={20}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20} height={20}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <label className={styles.remember}>
                <input type="checkbox" name="remember" />
                30天内记住我
              </label>
              <span className={styles.forgot} style={{ opacity: 0.5, cursor: "default" }} title="单人站点，请妥善保管密码">
                忘记密码？
              </span>
            </div>
            <button type="submit" className={styles.hoverBtn} disabled={loading}>
              <span className={styles.label}>{loading ? "登录中…" : "登 录"}</span>
              <div className={styles.overlay}>
                <span>登 录</span>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={16} height={16}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </button>
          </form>
          <div className={styles.divider}>
            先逛逛？<Link href="/" className={styles.guestLink}>返回访客首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
