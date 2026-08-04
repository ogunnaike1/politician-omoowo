import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import WebSocket from "ws";
import type { Database } from "../src/lib/database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env before seeding.");
  process.exit(1);
}

const supabase = createClient<Database>(url, key, {
  // Node 20 has no native WebSocket global; supabase-js's realtime client needs one
  // even though this script never subscribes to realtime channels.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  realtime: { transport: WebSocket as any },
});

function check<T extends { error: { message: string } | null }>(result: T, label: string): T {
  if (result.error) {
    console.error(`${label} failed:`, result.error.message);
    process.exit(1);
  }
  return result;
}

async function main() {
  console.log("Seeding news articles...");
  check(
    await supabase.from("news_articles").insert([
    {
      date: "2026-07-18",
      title: "Grand Campaign Launch Rally Set for 2 August — Omoowo Calls on All of Ogun East to Attend",
      excerpt:
        "Alhaji Abdulhameed Oluwafemi Omotayo has formally announced the Grand Campaign Launch Rally scheduled for Saturday, 2 August 2026 at Ijebu-Ode Township Stadium. The event is open to all residents of Ogun East Senatorial District. Omoowo says the rally marks the official start of a people-first campaign — not in Abuja, but in the community.",
      category: "CAMPAIGN_UPDATE",
      read_min: 3,
      live: true,
    },
    {
      date: "2026-07-12",
      title: "Omoowo Unveils Five-Point Infrastructure Plan for Ogun East Federal Roads",
      excerpt:
        "The PDP candidate for Ogun East has published a detailed legislative agenda for road infrastructure rehabilitation, targeting all three LGAs of the Senatorial District — with specific reference to long-abandoned federal road projects.",
      category: "STATEMENT",
      read_min: 4,
      live: false,
    },
    {
      date: "2026-07-10",
      title: "Omoowo Calls for Urgent Federal Intervention in Ogun East Healthcare Facilities",
      excerpt:
        "In a statement, the PDP Senatorial candidate highlighted chronic underfunding of primary healthcare centres across the district and called on NHIA to prioritise Ogun East in its next allocation cycle.",
      category: "STATEMENT",
      read_min: 3,
      live: false,
    },
    {
      date: "2026-07-05",
      title: "Youth Leaders Across Ikenne LGA Formally Back Omoowo's 2027 Senatorial Bid",
      excerpt:
        "A coalition of youth associations in Ikenne Local Government Area issued a formal endorsement of Omoowo, citing his education and empowerment commitments as central to their support.",
      category: "COMMUNITY",
      read_min: 2,
      live: false,
    },
    {
      date: "2026-06-28",
      title: "Stakeholders Consultation Concludes in Sagamu — Over 200 Community Leaders Engaged",
      excerpt:
        "Omoowo's team concluded a three-day consultation in Sagamu, meeting market associations, youth groups, and community elders across Ikenne LGA.",
      category: "CAMPAIGN_UPDATE",
      read_min: 3,
      live: false,
    },
    {
      date: "2026-06-22",
      title: "Omoowo Meets Fishing Communities in Ogun Waterside — Pledges Action on Coastal Security",
      excerpt:
        "The PDP candidate met fishing community leaders in Ogun Waterside LGA and outlined legislative proposals to address coastal piracy and support fishermen's livelihoods.",
      category: "COMMUNITY",
      read_min: 3,
      live: false,
    },
    {
      date: "2026-06-08",
      title: "PDP Ward Congress Endorses Omoowo Across All Three LGAs of Ogun East",
      excerpt:
        "Following the completion of the PDP ward congress, Omoowo secured endorsements from ward delegates across Ijebu-East, Ogun Waterside, and Ikenne LGAs.",
      category: "PRESS_RELEASE",
      read_min: 2,
      live: false,
    },
    {
      date: "2026-05-15",
      title: "Omoowo Formally Declares Candidacy for the 2027 Ogun East Senatorial Election",
      excerpt:
        "In a formal declaration before party leaders in Ijebu-Ode, Alhaji Abdulhameed Oluwafemi Omotayo officially announced his candidacy for the 2027 Ogun East Senatorial District election under the PDP platform.",
      category: "PRESS_RELEASE",
      read_min: 4,
      live: false,
    },
    ]),
    "Seeding news articles",
  );

  console.log("Seeding events...");
  check(
    await supabase.from("events").insert([
    {
      date: "2026-08-02",
      time: "10:00 AM",
      title: "Grand Campaign Launch Rally",
      location: "Ijebu-Ode Township Stadium",
      lga: "Ijebu-East",
      type: "RALLY",
      featured: true,
    },
    {
      date: "2026-08-23",
      time: "9:00 AM",
      title: "Youth Empowerment Summit",
      location: "Sagamu Polytechnic Hall",
      lga: "Ikenne",
      type: "SUMMIT",
      featured: false,
    },
    {
      date: "2026-09-06",
      time: "2:00 PM",
      title: "Women's Forum & Town Hall",
      location: "Ijebu-East LGA Secretariat",
      lga: "Ijebu-East",
      type: "FORUM",
      featured: false,
    },
    {
      date: "2026-09-20",
      time: "11:00 AM",
      title: "Ogun Waterside Stakeholders Consultation",
      location: "Ogun Waterside LGA Headquarters",
      lga: "Ogun Waterside",
      type: "CONSULTATION",
      featured: false,
    },
    {
      date: "2026-10-04",
      time: "8:00 AM",
      title: "Ikenne Ward-by-Ward Consultation",
      location: "Ikenne LGA Community Centre",
      lga: "Ikenne",
      type: "TOWN_HALL",
      featured: false,
    },
    {
      date: "2026-11-08",
      time: "12:00 PM",
      title: "PDP Mega Rally — Ogun East",
      location: "Ijebu-Ode Expressway Grounds",
      lga: "Ijebu-East",
      type: "RALLY",
      featured: false,
    },
    {
      date: "2026-12-06",
      time: "10:00 AM",
      title: "Omoowo Women Leaders Forum",
      location: "Sagamu Multi-purpose Hall",
      lga: "Ikenne",
      type: "FORUM",
      featured: false,
    },
    {
      date: "2027-01-10",
      time: "9:00 AM",
      title: "Final Campaign Town Hall",
      location: "Ijebu-East LGA Grounds",
      lga: "Ijebu-East",
      type: "TOWN_HALL",
      featured: false,
    },
    // Past events
    {
      date: "2026-05-15",
      time: "10:00 AM",
      title: "Declaration of Intent",
      location: "Ijebu-Ode, Ogun State",
      lga: "Ijebu-East",
      type: "CONSULTATION",
      featured: false,
      note: "Official declaration of Omoowo's 2027 Senatorial candidacy before party leaders and stakeholders.",
    },
    {
      date: "2026-06-08",
      time: "10:00 AM",
      title: "PDP Ward Congress",
      location: "Ogun East District",
      lga: "Ogun East",
      type: "CONSULTATION",
      featured: false,
      note: "Ward-level delegate consultations completed across all 3 LGAs of Ogun East.",
    },
    {
      date: "2026-06-22",
      time: "10:00 AM",
      title: "Stakeholders Consultation",
      location: "Sagamu, Ogun State",
      lga: "Ikenne",
      type: "CONSULTATION",
      featured: false,
      note: "Private engagement with community leaders, market associations, and youth organisations.",
    },
    ]),
    "Seeding events",
  );

  console.log("Seeding policies...");
  check(
    await supabase.from("policies").insert([
    {
      order: 0,
      title: "Infrastructure & Roads",
      tagline: "Connecting Ogun East to opportunity.",
      summary:
        "Poor road networks remain one of the biggest barriers to economic growth in Ogun East. Farmers cannot move produce to market. Traders lose hours to impassable roads. Communities stay isolated. Omoowo will make infrastructure rehabilitation a legislative priority from his first day in the National Assembly.",
      commitments: [
        "Sponsor bills to fast-track federal allocation for road rehabilitation across all three LGAs",
        "Lobby for the completion of long-abandoned federal road projects in Ijebu-East and Ogun Waterside",
        "Advocate for rural bridge construction to open up farming communities",
        "Push for street lighting and drainage infrastructure in urban centres",
        "Ensure FERMA (Federal Roads Maintenance Agency) accountability in Ogun East",
      ],
      impact:
        "Better roads mean lower transport costs, faster access to hospitals and schools, and a more connected economy that works for everyone.",
      accent_color: "#008B4D",
    },
    {
      order: 1,
      title: "Education & Youth Empowerment",
      tagline: "Investing in the next generation of Ogun East.",
      summary:
        "Education is the single most powerful tool for lifting communities out of poverty. Yet too many schools in Ogun East are underfunded, understaffed, and underequipped. Omoowo believes that every child in the Senatorial District deserves access to quality education — and every young person deserves a pathway to a productive career.",
      commitments: [
        "Secure federal intervention funding for public primary and secondary schools across Ogun East",
        "Establish a constituency scholarship programme for outstanding students from low-income families",
        "Lobby for the siting of a federal vocational training centre in Ogun East",
        "Advocate for improved teacher recruitment and welfare in the district",
        "Support legislation for digital literacy programmes in rural schools",
      ],
      impact:
        "An educated generation is the foundation of sustainable development. When youth are empowered, communities thrive for decades.",
      accent_color: "#E63035",
    },
    {
      order: 2,
      title: "Healthcare Access",
      tagline: "Quality care must reach every community.",
      summary:
        "In parts of Ogun East, the nearest functioning hospital is hours away. Women give birth without skilled attendants. Preventable diseases go untreated. This is unacceptable. Omoowo will fight in the National Assembly for healthcare infrastructure and funding that reflects the real needs of Ogun East's population.",
      commitments: [
        "Sponsor legislation to upgrade and properly equip primary healthcare centres in every LGA",
        "Advocate for the deployment of mobile health units to underserved rural communities",
        "Push for expanded NHIA (National Health Insurance Authority) coverage in Ogun East",
        "Lobby for a federal specialist hospital or upgraded general hospital for the district",
        "Support maternal and child health programmes with dedicated federal funding",
      ],
      impact:
        "When people have access to healthcare, they can work, study, and build. A healthier Ogun East is a more productive and prosperous one.",
      accent_color: "#008B4D",
    },
    {
      order: 3,
      title: "Security & Community Safety",
      tagline: "Every family deserves to feel safe.",
      summary:
        "Security challenges — from farmer-herder conflicts to coastal piracy in Ogun Waterside — have disrupted livelihoods and driven displacement across Ogun East. Omoowo understands that security is not just a law enforcement issue but a development one. Without safety, no investment, agricultural or otherwise, can take root.",
      commitments: [
        "Advocate for increased deployment of security personnel to hotspot areas in Ogun East",
        "Support legislation for community policing frameworks that involve local stakeholders",
        "Push for federal intervention in resolving farmer-herder conflicts through dialogue and policy",
        "Lobby for improved security infrastructure for coastal communities in Ogun Waterside",
        "Promote inter-agency coordination between military, police, and local government on security",
      ],
      impact:
        "Security is the foundation on which all other development rests. A safe Ogun East is one where investment flows and families can live without fear.",
      accent_color: "#E63035",
    },
    {
      order: 4,
      title: "Agriculture & Economic Growth",
      tagline: "Unlocking the full potential of Ogun East's land and people.",
      summary:
        "Ogun East has some of the most fertile land in Nigeria and a coastline that offers immense fishing and maritime potential. Yet most of this wealth remains untapped due to lack of investment, poor infrastructure, and limited market access. Omoowo will champion agribusiness, small enterprise support, and rural electrification to build a diverse, resilient economy.",
      commitments: [
        "Lobby for federal agribusiness investment programmes targeting Ogun East farmers",
        "Advocate for rural electrification projects to power farms, cold storage, and small businesses",
        "Support legislation to connect Ogun East producers to national and regional commodity markets",
        "Push for microfinance and SME support schemes accessible to traders and entrepreneurs in the district",
        "Promote the fishing and maritime economy of Ogun Waterside through targeted federal programmes",
      ],
      impact:
        "A thriving agricultural and small business sector means jobs, food security, and economic independence for every community in Ogun East.",
      accent_color: "#008B4D",
    },
    ]),
    "Seeding policies",
  );

  console.log("Seeding endorsements...");
  check(
    await supabase.from("endorsements").insert([
    {
      order: 0,
      quote:
        "Omoowo is not a stranger to our communities. He has been here through the struggles and the progress. That is the kind of senator Ogun East needs.",
      name: "PDP Ogun State Leadership",
      role: "Peoples Democratic Party, Ogun State Chapter",
    },
    {
      order: 1,
      quote:
        "What sets Omoowo apart is that he listens. He does not just come to town during elections — he has always been present.",
      name: "Community Leader, Ijebu-East LGA",
      role: "Traditional Rulers Council Representative",
    },
    {
      order: 2,
      quote:
        "The people of Ogun Waterside have waited long enough. Omoowo understands our challenges and has a real plan to address them.",
      name: "Market Women Association",
      role: "Ogun Waterside Local Government",
    },
    {
      order: 3,
      quote:
        "Our young people need someone at Abuja who will actually fight for their future. Omoowo has proven he can be that person.",
      name: "Youth Leaders Forum",
      role: "Ogun East Senatorial District",
    },
    ]),
    "Seeding endorsements",
  );

  console.log("Seeding site settings...");
  check(
    await supabase
      .from("site_settings")
      .upsert({
      id: 1,
      candidate_full_name: "Alhaji Abdulhameed Oluwafemi Omotayo",
      known_as: "Omoowo",
      hero_headline_line1: "Alhaji Omoowo",
      hero_headline_line2: "Omotayo.",
      hero_subtitle: "PDP · Ogun East Senatorial District · 2027",
      hero_body:
        "Bringing experienced, community-driven leadership to the National Assembly for the people of Ogun East.",
      hero_image_url: "https://res.cloudinary.com/dhmqhless/image/upload/v1784251310/omoowo_zflh1d.jpg",
      candidate_bio: [
        "Alhaji Abdulhameed Oluwafemi Omotayo, widely known as Omoowo, is a prominent community leader, businessman, and PDP stalwart with deep roots across the Ogun East Senatorial District. He has dedicated years to grassroots development, youth empowerment, and championing the welfare of ordinary people in Ogun State.",
        "As the PDP candidate for the 2027 Ogun East Senatorial District election, Omoowo brings a clear, people-first agenda to the National Assembly — focused on infrastructure, education, security, and economic opportunity for every community in Ogun East.",
      ],
      candidate_image_url: "https://res.cloudinary.com/dhmqhless/image/upload/v1784255332/omoowo4_wyrzo8.png",
      profile_bio: [
        "Alhaji Abdulhameed Oluwafemi Omotayo — widely known and beloved across Ogun State as Omoowo — is a community leader, accomplished businessman, and long-standing pillar of the Peoples Democratic Party (PDP) in Ogun East. His story is inseparable from the story of the communities he has served throughout his life.",
        "Born and raised in Ogun East, Omoowo grew up with a firsthand understanding of the challenges facing ordinary families across the Senatorial District — the broken roads that cut communities off from opportunity, the schools that need investment, the healthcare centres that struggle without resources, and the young people whose potential goes unrealised for want of support.",
        "Rather than turn away from these realities, Omoowo built his career around confronting them. Through decades of grassroots engagement — from Ijebu-East to Ogun Waterside, from Ikenne to the remotest communities of the district — he has worked alongside traditional rulers, women's associations, youth groups, and business communities to drive the kind of development that begins at the grassroots.",
        "His reputation as a man of the people is not a political slogan. It is a track record visible in the communities where he has invested his time, resources, and energy. He is the kind of leader who shows up — not during election season, but consistently, year after year, building relationships and earning trust the old-fashioned way.",
        "As the PDP candidate for the 2027 Ogun East Senatorial District election, Omoowo brings to the National Assembly a clear agenda grounded in his deep knowledge of the district's needs: infrastructure rehabilitation, education investment, healthcare access, security, and economic development for every LGA under Ogun East.",
        "His candidacy represents a new chapter — not just for him, but for every family in Ogun East that has waited too long for a senator who truly knows them, fights for them, and delivers for them.",
      ],
      profile_image_url:
        "https://res.cloudinary.com/dhmqhless/image/upload/v1784253381/ChatGPT_Image_Jul_17_2026_02_54_01_AM_y1wlyw.png",
      contact_office_address: "Ijebu-Ode, Ogun State",
      contact_email: "contact@omoowo2027.ng",
      contact_whatsapp: "+234 800 000 0000",
      whatsapp_share_message:
          "I'm standing with Alhaji Omoowo for Ogun East Federal Constituency in 2027. He represents real change for our communities. Join me",
      })
      .select(),
    "Seeding site settings",
  );

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
