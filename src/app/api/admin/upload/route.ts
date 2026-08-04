import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { supabase } from "@/lib/supabase";
import { jsonError } from "@/lib/api";

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonError("A file is required (multipart field 'file')");
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return jsonError(`Unsupported file type: ${file.type}`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    return jsonError("File is too large (max 8MB)");
  }

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  const { data, error } = await supabase
    .from("media")
    .insert({ url: blob.url, label: file.name })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data, { status: 201 });
}
