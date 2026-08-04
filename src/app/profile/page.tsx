import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import ProfilePageClient from "./ProfilePageClient";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dhmqhless/image/upload/v1784253381/ChatGPT_Image_Jul_17_2026_02_54_01_AM_y1wlyw.png";

const FALLBACK_BIO = [
  "Alhaji Abdulhameed Oluwafemi Omotayo — widely known and beloved across Ogun State as Omoowo — is a community leader, accomplished businessman, and long-standing pillar of the Peoples Democratic Party (PDP) in Ogun East. His story is inseparable from the story of the communities he has served throughout his life.",
  "Born and raised in Ogun East, Omoowo grew up with a firsthand understanding of the challenges facing ordinary families across the Senatorial District — the broken roads that cut communities off from opportunity, the schools that need investment, the healthcare centres that struggle without resources, and the young people whose potential goes unrealised for want of support.",
  "Rather than turn away from these realities, Omoowo built his career around confronting them. Through decades of grassroots engagement — from Ijebu-East to Ogun Waterside, from Ikenne to the remotest communities of the district — he has worked alongside traditional rulers, women's associations, youth groups, and business communities to drive the kind of development that begins at the grassroots.",
  "His reputation as a man of the people is not a political slogan. It is a track record visible in the communities where he has invested his time, resources, and energy. He is the kind of leader who shows up — not during election season, but consistently, year after year, building relationships and earning trust the old-fashioned way.",
  "As the PDP candidate for the 2027 Ogun East Senatorial District election, Omoowo brings to the National Assembly a clear agenda grounded in his deep knowledge of the district's needs: infrastructure rehabilitation, education investment, healthcare access, security, and economic development for every LGA under Ogun East.",
  "His candidacy represents a new chapter — not just for him, but for every family in Ogun East that has waited too long for a senator who truly knows them, fights for them, and delivers for them.",
];

export default async function ProfilePage() {
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

  const imageUrl = settings?.profile_image_url || FALLBACK_IMAGE;
  const bioParagraphs = settings?.profile_bio?.length ? settings.profile_bio : FALLBACK_BIO;

  return (
    <>
      <Nav />
      <main>
        <ProfilePageClient imageUrl={imageUrl} bioParagraphs={bioParagraphs} />
      </main>
      <Footer />
    </>
  );
}
