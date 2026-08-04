import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PageHeader, PrimaryButton } from "../_components/ui";
import { DeleteButton } from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function EndorsementsListPage() {
  const { data: endorsements, error } = await supabase.from("endorsements").select("*").order("order", { ascending: true });
  if (error) throw new Error(error.message);

  return (
    <div>
      <PageHeader
        title="Endorsements"
        action={
          <Link href="/admin/endorsements/new">
            <PrimaryButton type="button">+ New Endorsement</PrimaryButton>
          </Link>
        }
      />

      {endorsements.length === 0 && <p className="text-sm text-[#888888]">No endorsements yet.</p>}

      <div className="space-y-3">
        {endorsements.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border border-[#DCDCDC] bg-white p-4">
            <div className="min-w-0">
              <p className="text-[10px] tracking-wide uppercase text-[#888888]">
                Order {item.order} · {item.name} — {item.role}
              </p>
              <p className="text-sm text-[#1A1A1A] truncate italic">&ldquo;{item.quote}&rdquo;</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/endorsements/${item.id}`}
                className="px-3 py-1.5 border border-[#DCDCDC] text-[11px] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
              >
                Edit
              </Link>
              <DeleteButton endpoint={`/api/admin/endorsements/${item.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
