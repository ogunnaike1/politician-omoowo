"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-8 border border-[#DCDCDC]">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888] mb-2">Omoowo 2027</p>
        <h1 className="text-xl font-semibold text-[#1A1A1A] mb-6">Admin Login</h1>

        <label className="block mb-5">
          <span className="block text-[11px] font-medium tracking-wide uppercase text-[#888888] mb-1.5">
            Email
          </span>
          <input
            type="email"
            autoFocus
            autoComplete="username"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#DCDCDC] px-3 py-2 text-sm outline-none focus:border-[#008B4D] transition-colors"
          />
        </label>

        <label className="block mb-5">
          <span className="block text-[11px] font-medium tracking-wide uppercase text-[#888888] mb-1.5">
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#DCDCDC] px-3 py-2 text-sm outline-none focus:border-[#008B4D] transition-colors"
          />
        </label>

        {error && <p className="text-[#E63035] text-[13px] mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full px-4 py-2.5 bg-[#008B4D] text-white text-sm font-medium hover:bg-[#006B3A] transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
