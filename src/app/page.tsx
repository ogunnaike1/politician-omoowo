import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Candidate from "@/components/Candidate";
import Vision from "@/components/Vision";
import Priorities from "@/components/Priorities";
import Record from "@/components/Record";
import Endorsements from "@/components/Endorsements";
import Involved from "@/components/Involved";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settingsResult = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  const endorsementsResult = await supabase.from("endorsements").select("*").order("order", { ascending: true });

  if (endorsementsResult.error) throw new Error(endorsementsResult.error.message);

  const settings = settingsResult.data;
  const quotes = (endorsementsResult.data ?? []).map((e) => ({ q: e.quote, name: e.name, role: e.role }));

  return (
    <>
      <Nav />
      <main>
        <Hero
          headlineLine1={settings?.hero_headline_line1}
          headlineLine2={settings?.hero_headline_line2}
          subtitle={settings?.hero_subtitle}
          body={settings?.hero_body}
          imageUrl={settings?.hero_image_url || undefined}
          knownAs={settings?.known_as}
        />
        <Candidate
          bioParagraphs={settings?.candidate_bio?.length ? settings.candidate_bio : undefined}
          imageUrl={settings?.candidate_image_url || undefined}
          knownAs={settings?.known_as}
        />
        <Vision />
        <Priorities />
        <Record />
        <Endorsements quotes={quotes} />
        <Involved />
      </main>
      <Footer />
    </>
  );
}
