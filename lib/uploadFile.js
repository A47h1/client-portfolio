import { supabase } from "./supabaseClient";

export async function uploadFile(file, folder = "uploads") {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
  return data.publicUrl;
}
