import { supabase } from "@/lib/supabase";
import { PageHeader } from "../_components/ui";
import { MediaUploader } from "./MediaUploader";
import { CopyUrlButton } from "./CopyUrlButton";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const { data: media, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return (
    <div>
      <PageHeader title="Media" />
      <p className="text-sm text-[#888888] mb-6">
        Upload an image to get a URL you can paste into News, Events, or Settings.
      </p>

      <MediaUploader />

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-8">
        {media.map((item) => (
          <div key={item.id} className="border border-[#DCDCDC] bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.label ?? ""} className="w-full aspect-square object-cover mb-2" />
            <CopyUrlButton url={item.url} />
          </div>
        ))}
      </div>

      {media.length === 0 && <p className="text-sm text-[#888888] mt-6">No uploads yet.</p>}
    </div>
  );
}
