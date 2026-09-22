import { supabase } from "./supabaseClient";

export async function getSiteContent() {
  const [
    { data: profile },
    { data: interests },
    { data: publications },
    { data: projects },
    { data: timeline },
    { data: skills },
  ] = await Promise.all([
    supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
    supabase
      .from("research_interests")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false })
      .order("sort_order", { ascending: true }),
    supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("timeline_entries")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase.from("skills").select("*").order("sort_order", { ascending: true }),
  ]);

  return {
    profile: profile || null,
    interests: interests || [],
    publications: publications || [],
    projects: projects || [],
    timeline: timeline || [],
    skills: skills || [],
  };
}
