"use client";

import { useState } from "react";
import { labelClass } from "./ui";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
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
      onChange(body.url);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="mb-5">
      <span className={labelClass}>{label}</span>
      <div className="flex items-start gap-4">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-20 h-20 object-cover border border-[#DCDCDC] shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL"
            className="w-full border border-[#DCDCDC] px-3 py-2 text-sm outline-none focus:border-[#008B4D] transition-colors mb-2"
          />
          <label className="inline-block px-3 py-1.5 border border-[#DCDCDC] text-[11px] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors cursor-pointer">
            {uploading ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/*" onChange={onFileChange} disabled={uploading} className="hidden" />
          </label>
          {error && <p className="text-[#E63035] text-[12px] mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
}
