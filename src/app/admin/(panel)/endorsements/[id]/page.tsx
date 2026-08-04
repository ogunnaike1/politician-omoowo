import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "../../_components/ui";
import { EndorsementForm } from "../EndorsementForm";

export const dynamic = "force-dynamic";

export default async function EditEndorsementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await supabase.from("endorsements").select("*").eq("id", id).maybeSingle();
  if (!item) notFound();

  return (
    <div>
      <PageHeader title="Edit Endorsement" />
      <EndorsementForm
        id={item.id}
        initial={{ order: item.order, quote: item.quote, name: item.name, role: item.role }}
      />
    </div>
  );
}
