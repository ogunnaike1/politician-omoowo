import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import PoliciesPageClient, { PolicyItem } from "./PoliciesPageClient";

export const dynamic = "force-dynamic";

export default async function PoliciesPage() {
  const { data: rows, error } = await supabase.from("policies").select("*").order("order", { ascending: true });
  if (error) throw new Error(error.message);

  const policies: PolicyItem[] = rows.map((p, i) => ({
    n: String(i + 1).padStart(2, "0"),
    accent: p.accent_color,
    title: p.title,
    tagline: p.tagline,
    summary: p.summary,
    commitments: p.commitments,
    impact: p.impact,
  }));

  return (
    <>
      <Nav />
      <main>
        <PoliciesPageClient policies={policies} />
      </main>
      <Footer />
    </>
  );
}
