import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "../../_components/ui";
import { PolicyForm } from "../PolicyForm";

export const dynamic = "force-dynamic";

export default async function EditPolicyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await supabase.from("policies").select("*").eq("id", id).maybeSingle();
  if (!item) notFound();

  return (
    <div>
      <PageHeader title="Edit Policy" />
      <PolicyForm
        id={item.id}
        initial={{
          order: item.order,
          title: item.title,
          tagline: item.tagline,
          summary: item.summary,
          commitments: item.commitments.join("\n"),
          impact: item.impact,
          accentColor: item.accent_color,
        }}
      />
    </div>
  );
}
