import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { EVENT_TYPE_VALUES, EventType } from "@/lib/database.types";
import { jsonError, parseBody } from "@/lib/api";

export async function GET() {
  const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const { date, time, title, location, lga, type, featured, note, imageUrl } = body as Record<string, unknown>;
  if (!date || !time || !title || !location || !lga || !type) {
    return jsonError("date, time, title, location, lga, and type are required");
  }
  if (!EVENT_TYPE_VALUES.includes(type as EventType)) {
    return jsonError(`type must be one of: ${EVENT_TYPE_VALUES.join(", ")}`);
  }

  const { data, error } = await supabase
    .from("events")
    .insert({
      date: new Date(date as string).toISOString(),
      time: time as string,
      title: title as string,
      location: location as string,
      lga: lga as string,
      type: type as EventType,
      featured: Boolean(featured),
      note: (note as string) || null,
      image_url: (imageUrl as string) || null,
    })
    .select()
    .single();

  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data, { status: 201 });
}
