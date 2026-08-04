import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError, parseBody } from "@/lib/api";

export async function GET() {
  const { data, error } = await supabase.from("endorsements").select("*").order("order", { ascending: true });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { order, quote, name, role } = body as Record<string, unknown>;
  if (!quote || !name || !role) {
    return jsonError("quote, name, and role are required");
  }

  const { data, error } = await supabase
    .from("endorsements")
    .insert({
      order: typeof order === "number" ? order : 0,
      quote: quote as string,
      name: name as string,
      role: role as string,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data, { status: 201 });
}
