import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "../../_components/ui";
import { EventForm } from "../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (!item) notFound();

  return (
    <div>
      <PageHeader title="Edit Event" />
      <EventForm
        id={item.id}
        initial={{
          date: item.date.slice(0, 10),
          time: item.time,
          title: item.title,
          location: item.location,
          lga: item.lga,
          type: item.type,
          featured: item.featured,
          note: item.note ?? "",
          imageUrl: item.image_url ?? "",
        }}
      />
    </div>
  );
}
