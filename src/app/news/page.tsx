import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { NEWS_CATEGORY_LABEL, formatDisplayDate } from "@/lib/format";
import NewsPageClient, { NewsItem } from "./NewsPageClient";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const { data: articles, error } = await supabase
    .from("news_articles")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);

  const news: NewsItem[] = (articles ?? []).map((a) => ({
    id: a.id,
    date: formatDisplayDate(a.date),
    title: a.title,
    excerpt: a.excerpt,
    category: NEWS_CATEGORY_LABEL[a.category] as NewsItem["category"],
    readMin: a.read_min,
    live: a.live,
  }));

  return (
    <>
      <Nav />
      <main>
        <NewsPageClient news={news} />
      </main>
      <Footer />
    </>
  );
}
