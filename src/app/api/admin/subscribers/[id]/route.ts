import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { error, count } = await supabase.from("newsletter_subscribers").delete({ count: "exact" }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (!count) return jsonError("Not found", 404);
  return NextResponse.json({ ok: true });
}
