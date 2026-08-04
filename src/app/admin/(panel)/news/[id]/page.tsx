import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PageHeader } from "../../_components/ui";
import { NewsForm } from "../NewsForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await supabase.from("news_articles").select("*").eq("id", id).maybeSingle();
  if (!item) notFound();

  return (
    <div>
      <PageHeader title="Edit Article" />
      <NewsForm
        id={item.id}
        initial={{
          date: item.date.slice(0, 10),
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          readMin: item.read_min,
          live: item.live,
          imageUrl: item.image_url ?? "",
        }}
      />
    </div>
  );
}
