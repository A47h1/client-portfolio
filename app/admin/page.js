"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin/dashboard");
    });
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-sm border border-ink/15 bg-white/60 p-8"
      >
        <h1 className="font-display text-2xl text-ink">Admin sign in</h1>
        <p className="mt-1 text-sm text-inkSoft">
          Manage your portfolio's content.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm text-inkSoft">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-inkSoft">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-poppy">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-leaf px-5 py-3 text-sm font-medium text-parchment transition-colors hover:bg-leaf-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <a href="/" className="mt-4 block text-center text-sm text-inkSoft hover:text-leaf-dark">
          ← Back to site
        </a>
      </form>
    </div>
  );
}
