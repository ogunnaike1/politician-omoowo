import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError, parseBody } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { read } = body as Record<string, unknown>;
  const { data, error } = await supabase
    .from("contact_messages")
    .update({ read: Boolean(read) })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) return jsonError(error.message, 500);
  if (!data) return jsonError("Not found", 404);
  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { error, count } = await supabase.from("contact_messages").delete({ count: "exact" }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (!count) return jsonError("Not found", 404);
  return NextResponse.json({ ok: true });
}
