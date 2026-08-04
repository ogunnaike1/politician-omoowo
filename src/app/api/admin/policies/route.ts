import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError, parseBody } from "@/lib/api";

export async function GET() {
  const { data, error } = await supabase.from("policies").select("*").order("order", { ascending: true });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { order, title, tagline, summary, commitments, impact, accentColor } = body as Record<string, unknown>;
  if (!title || !tagline || !summary || !impact) {
    return jsonError("title, tagline, summary, and impact are required");
  }

  const { data, error } = await supabase
    .from("policies")
    .insert({
      order: typeof order === "number" ? order : 0,
      title: title as string,
      tagline: tagline as string,
      summary: summary as string,
      commitments: Array.isArray(commitments) ? (commitments as string[]) : [],
      impact: impact as string,
      accent_color: (accentColor as string) || "#008B4D",
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data, { status: 201 });
}
