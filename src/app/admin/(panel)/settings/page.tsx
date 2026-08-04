import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/ui";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (!settings) {
    const { data: created, error } = await supabase.from("site_settings").insert({ id: 1 }).select().single();
    if (error) throw new Error(error.message);
    settings = created;
  }

  return (
    <div>
      <PageHeader title="Site Settings" />
      <SettingsForm
        initial={{
          candidateFullName: settings.candidate_full_name,
          knownAs: settings.known_as,
          heroHeadlineLine1: settings.hero_headline_line1,
          heroHeadlineLine2: settings.hero_headline_line2,
          heroSubtitle: settings.hero_subtitle,
          heroBody: settings.hero_body,
          heroImageUrl: settings.hero_image_url,
          candidateBio: settings.candidate_bio.join("\n\n"),
          candidateImageUrl: settings.candidate_image_url,
          profileBio: settings.profile_bio.join("\n\n"),
          profileImageUrl: settings.profile_image_url,
          contactOfficeAddress: settings.contact_office_address,
          contactEmail: settings.contact_email,
          contactWhatsapp: settings.contact_whatsapp,
          whatsappShareMessage: settings.whatsapp_share_message,
        }}
      />
    </div>
  );
}
