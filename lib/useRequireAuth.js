"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabaseClient";

export function useRequireAuth() {
  const router = useRouter();
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin");
      } else {
        setSession(data.session);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      if (!sess) {
        router.replace("/admin");
      } else {
        setSession(sess);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  return session;
}
