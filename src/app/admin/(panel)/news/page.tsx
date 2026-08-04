import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { PageHeader, PrimaryButton } from "../_components/ui";
import { DeleteButton } from "../_components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function NewsListPage() {
  const { data: news, error } = await supabase.from("news_articles").select("*").order("date", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div>
      <PageHeader
        title="News"
        action={
          <Link href="/admin/news/new">
            <PrimaryButton type="button">+ New Article</PrimaryButton>
          </Link>
        }
      />

      {news.length === 0 && <p className="text-sm text-[#888888]">No news articles yet.</p>}

      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 border border-[#DCDCDC] bg-white p-4">
            <div className="min-w-0">
              <p className="text-[10px] tracking-wide uppercase text-[#888888]">
                {item.date.slice(0, 10)} · {item.category.replace("_", " ")}
                {item.live && <span className="ml-2 text-[#008B4D]">LIVE</span>}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.title}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/news/${item.id}`}
                className="px-3 py-1.5 border border-[#DCDCDC] text-[11px] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
              >
                Edit
              </Link>
              <DeleteButton endpoint={`/api/admin/news/${item.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
