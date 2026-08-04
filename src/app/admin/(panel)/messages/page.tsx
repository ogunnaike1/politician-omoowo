import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/ui";
import { DeleteButton } from "../_components/DeleteButton";
import { MarkReadButton } from "./MarkReadButton";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div>
      <PageHeader title="Messages" />
      <p className="text-sm text-[#888888] mb-6">Submissions from the Contact page form.</p>

      {messages.length === 0 && <p className="text-sm text-[#888888]">No messages yet.</p>}

      <div className="space-y-3">
        {messages.map((item) => (
          <div key={item.id} className="border border-[#DCDCDC] bg-white p-4" style={{ opacity: item.read ? 0.6 : 1 }}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0">
                <p className="text-[10px] tracking-wide uppercase text-[#888888]">
                  {new Date(item.created_at).toLocaleString()} · {item.subject}
                  {!item.read && <span className="ml-2 text-[#008B4D]">NEW</span>}
                </p>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  {item.name} &lt;{item.email}&gt;
                  {item.phone && <span className="text-[#888888]"> · {item.phone}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <MarkReadButton id={item.id} read={item.read} />
                <DeleteButton endpoint={`/api/admin/messages/${item.id}`} />
              </div>
            </div>
            <p className="text-[13px] text-[#1A1A1A] leading-relaxed whitespace-pre-line">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
