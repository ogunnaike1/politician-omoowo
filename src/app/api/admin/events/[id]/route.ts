import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { EVENT_TYPE_VALUES, EventType } from "@/lib/database.types";
import { jsonError, parseBody } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error) return jsonError(error.message, 500);
  if (!data) return jsonError("Not found", 404);
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { date, time, title, location, lga, type, featured, note, imageUrl } = body as Record<string, unknown>;
  if (type !== undefined && !EVENT_TYPE_VALUES.includes(type as EventType)) {
    return jsonError(`type must be one of: ${EVENT_TYPE_VALUES.join(", ")}`);
  }

  const { data, error } = await supabase
    .from("events")
    .update({
      ...(date !== undefined && { date: new Date(date as string).toISOString() }),
      ...(time !== undefined && { time: time as string }),
      ...(title !== undefined && { title: title as string }),
      ...(location !== undefined && { location: location as string }),
      ...(lga !== undefined && { lga: lga as string }),
      ...(type !== undefined && { type: type as EventType }),
      ...(featured !== undefined && { featured: Boolean(featured) }),
      ...(note !== undefined && { note: (note as string) || null }),
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
  const { error, count } = await supabase.from("events").delete({ count: "exact" }).eq("id", id);
  if (error) return jsonError(error.message, 500);
  if (!count) return jsonError("Not found", 404);
  return NextResponse.json({ ok: true });
}
