import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "./_components/ui";

export const dynamic = "force-dynamic";

async function countRows(table: "news_articles" | "events" | "policies" | "endorsements" | "media") {
  const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
  if (error) throw new Error(error.message);
  return count ?? 0;
}

export default async function AdminDashboardPage() {
  const [newsCount, eventsCount, policiesCount, endorsementsCount, mediaCount] = await Promise.all([
    countRows("news_articles"),
    countRows("events"),
    countRows("policies"),
    countRows("endorsements"),
    countRows("media"),
  ]);

  const cards = [
    { label: "News articles", count: newsCount, href: "/admin/news" },
    { label: "Events", count: eventsCount, href: "/admin/events" },
    { label: "Policies", count: policiesCount, href: "/admin/policies" },
    { label: "Endorsements", count: endorsementsCount, href: "/admin/endorsements" },
    { label: "Uploaded media", count: mediaCount, href: "/admin/media" },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block border border-[#DCDCDC] bg-white p-5 hover:border-[#008B4D] transition-colors"
          >
            <p className="text-3xl font-light text-[#1A1A1A]">{c.count}</p>
            <p className="text-[11px] tracking-wide uppercase text-[#888888] mt-1">{c.label}</p>
          </Link>
        ))}
      </div>
      <p className="text-sm text-[#888888] mt-8">
        Edit site-wide text and photos (hero, bio, contact info) under{" "}
        <Link href="/admin/settings" className="text-[#008B4D] hover:underline">
          Settings
        </Link>
        . Contact form and newsletter submissions land in{" "}
        <Link href="/admin/messages" className="text-[#008B4D] hover:underline">
          Messages
        </Link>
        .
      </p>
    </div>
  );
}
