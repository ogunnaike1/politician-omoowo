"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MediaUploader() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Upload failed");
        return;
      }
      router.refresh();
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="inline-block px-4 py-2 bg-[#008B4D] text-white text-sm font-medium hover:bg-[#006B3A] transition-colors cursor-pointer">
        {uploading ? "Uploading…" : "Upload Image"}
        <input type="file" accept="image/*" onChange={onFileChange} disabled={uploading} className="hidden" />
      </label>
      {error && <p className="text-[#E63035] text-[13px] mt-2">{error}</p>}
    </div>
  );
}
