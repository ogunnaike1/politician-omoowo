import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { jsonError, parseBody } from "@/lib/api";

type SettingsUpdate = Database["public"]["Tables"]["site_settings"]["Update"];

const FIELD_MAP: Record<string, keyof SettingsUpdate> = {
  candidateFullName: "candidate_full_name",
  knownAs: "known_as",
  heroHeadlineLine1: "hero_headline_line1",
  heroHeadlineLine2: "hero_headline_line2",
  heroSubtitle: "hero_subtitle",
  heroBody: "hero_body",
  heroImageUrl: "hero_image_url",
  candidateBio: "candidate_bio",
  candidateImageUrl: "candidate_image_url",
  profileBio: "profile_bio",
  profileImageUrl: "profile_image_url",
  contactOfficeAddress: "contact_office_address",
  contactEmail: "contact_email",
  contactWhatsapp: "contact_whatsapp",
  whatsappShareMessage: "whatsapp_share_message",
};

async function getOrCreateSettings() {
  const { data: existing, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(error.message);
  if (existing) return existing;

  const { data: created, error: createError } = await supabase
    .from("site_settings")
    .insert({ id: 1 })
    .select()
    .single();
  if (createError) throw new Error(createError.message);
  return created;
}

export async function GET() {
  const settings = await getOrCreateSettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const body = await parseBody(request);
  if (!body) return jsonError("Invalid request body");

  const data: SettingsUpdate = {};
  for (const [camelField, column] of Object.entries(FIELD_MAP)) {
    if (body[camelField] !== undefined) {
      (data as Record<string, unknown>)[column] = body[camelField];
    }
  }

  await getOrCreateSettings();
  const { data: updated, error } = await supabase.from("site_settings").update(data).eq("id", 1).select().single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(updated);
}
