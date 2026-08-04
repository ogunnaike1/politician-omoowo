import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { NEWS_CATEGORY_VALUES, NewsCategory } from "@/lib/database.types";
import { jsonError, parseBody } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { data, error } = await supabase.from("news_articles").select("*").eq("id", id).maybeSingle();
  if (error) return jsonError(error.message, 500);
  if (!data) return jsonError("Not found", 404);
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { date, title, excerpt, category, readMin, live, imageUrl } = body as Record<string, unknown>;
  if (category !== undefined && !NEWS_CATEGORY_VALUES.includes(category as NewsCategory)) {
    return jsonError(`category must be one of: ${NEWS_CATEGORY_VALUES.join(", ")}`);
  }

  const { data, error } = await supabase
    .from("news_articles")
    .update({
      ...(date !== undefined && { date: new Date(date as string).toISOString() }),
      ...(title !== undefined && { title: title as string }),
      ...(excerpt !== undefined && { excerpt: excerpt as string }),
      ...(category !== undefined && { category: category as NewsCategory }),
      ...(readMin !== undefined && { read_min: readMin as number }),
      ...(live !== undefined && { live: Boolean(live) }),
      ...(imageUrl !== undefined && { image_url: (imageUrl as string) || null }),
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) return jsonError(error.message, 500);
  if (!data) return jsonError("Not found", 404);
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { error, count } = await supabase.from("news_articles").delete({ count: "exact" }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (!count) return jsonError("Not found", 404);
  return NextResponse.json({ ok: true });
}
