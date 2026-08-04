import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { NEWS_CATEGORY_VALUES, NewsCategory } from "@/lib/database.types";
import { jsonError, parseBody } from "@/lib/api";

export async function GET() {
  const { data, error } = await supabase.from("news_articles").select("*").order("date", { ascending: false });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { date, title, excerpt, category, readMin, live, imageUrl } = body as Record<string, unknown>;
  if (!date || !title || !excerpt || !category) {
    return jsonError("date, title, excerpt, and category are required");
  }
  if (!NEWS_CATEGORY_VALUES.includes(category as NewsCategory)) {
    return jsonError(`category must be one of: ${NEWS_CATEGORY_VALUES.join(", ")}`);
  }

  const { data, error } = await supabase
    .from("news_articles")
    .insert({
      date: new Date(date as string).toISOString(),
      title: title as string,
      excerpt: excerpt as string,
      category: category as NewsCategory,
      read_min: typeof readMin === "number" ? readMin : 3,
      live: Boolean(live),
      image_url: (imageUrl as string) || null,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data, { status: 201 });
}
