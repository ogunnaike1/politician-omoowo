import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { jsonError } from "@/lib/api";

export async function GET() {
  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
