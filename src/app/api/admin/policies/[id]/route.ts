import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError, parseBody } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { data, error } = await supabase.from("policies").select("*").eq("id", id).maybeSingle();
  if (error) return jsonError(error.message, 500);
  if (!data) return jsonError("Not found", 404);
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { order, title, tagline, summary, commitments, impact, accentColor } = body as Record<string, unknown>;

  const { data, error } = await supabase
    .from("policies")
    .update({
      ...(order !== undefined && { order: order as number }),
      ...(title !== undefined && { title: title as string }),
      ...(tagline !== undefined && { tagline: tagline as string }),
      ...(summary !== undefined && { summary: summary as string }),
      ...(commitments !== undefined && { commitments: commitments as string[] }),
      ...(impact !== undefined && { impact: impact as string }),
      ...(accentColor !== undefined && { accent_color: accentColor as string }),
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
  const { error, count } = await supabase.from("policies").delete({ count: "exact" }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (!count) return jsonError("Not found", 404);
  return NextResponse.json({ ok: true });
}
