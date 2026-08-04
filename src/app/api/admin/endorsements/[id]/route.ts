import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError, parseBody } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { data, error } = await supabase.from("endorsements").select("*").eq("id", id).maybeSingle();
  if (error) return jsonError(error.message, 500);
  if (!data) return jsonError("Not found", 404);
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { order, quote, name, role } = body as Record<string, unknown>;

  const { data, error } = await supabase
    .from("endorsements")
    .update({
      ...(order !== undefined && { order: order as number }),
      ...(quote !== undefined && { quote: quote as string }),
      ...(name !== undefined && { name: name as string }),
      ...(role !== undefined && { role: role as string }),
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
  const { error, count } = await supabase.from("endorsements").delete({ count: "exact" }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (!count) return jsonError("Not found", 404);
  return NextResponse.json({ ok: true });
}
