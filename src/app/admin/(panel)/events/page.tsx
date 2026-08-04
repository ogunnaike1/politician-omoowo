import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PageHeader, PrimaryButton } from "../_components/ui";
import { DeleteButton } from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function EventsListPage() {
  const { data: events, error } = await supabase.from("events").select("*").order("date", { ascending: true });
  if (error) throw new Error(error.message);
  const now = new Date();

  return (
    <div>
      <PageHeader
        title="Events"
        action={
          <Link href="/admin/events/new">
            <PrimaryButton type="button">+ New Event</PrimaryButton>
          </Link>
        }
      />

      {events.length === 0 && <p className="text-sm text-[#888888]">No events yet.</p>}

      <div className="space-y-3">
        {events.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border border-[#DCDCDC] bg-white p-4">
            <div className="min-w-0">
              <p className="text-[10px] tracking-wide uppercase text-[#888888]">
                {item.date.slice(0, 10)} · {item.time} · {item.type.replace("_", " ")} ·{" "}
                {new Date(item.date) < now ? "Past" : "Upcoming"}
                {item.featured && <span className="ml-2 text-[#E63035]">Featured</span>}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.title}</p>
              <p className="text-[12px] text-[#888888] truncate">{item.location}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/events/${item.id}`}
                className="px-3 py-1.5 border border-[#DCDCDC] text-[11px] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
              >
                Edit
              </Link>
              <DeleteButton endpoint={`/api/admin/events/${item.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
