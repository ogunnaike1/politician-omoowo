import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/ui";
import { DeleteButton } from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div>
      <PageHeader title="Newsletter Subscribers" />
      <p className="text-sm text-[#888888] mb-6">{subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}.</p>

      {subscribers.length === 0 && <p className="text-sm text-[#888888]">No subscribers yet.</p>}

      <div className="space-y-3">
        {subscribers.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border border-[#DCDCDC] bg-white p-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.email}</p>
              <p className="text-[10px] tracking-wide uppercase text-[#888888]">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
            <DeleteButton endpoint={`/api/admin/subscribers/${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
