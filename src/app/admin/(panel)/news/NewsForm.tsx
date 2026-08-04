"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputClass, PrimaryButton, SecondaryButton } from "../_components/ui";
import { ImageUploadField } from "../_components/ImageUploadField";

const CATEGORIES = [
  { value: "PRESS_RELEASE", label: "Press Release" },
  { value: "CAMPAIGN_UPDATE", label: "Campaign Update" },
  { value: "COMMUNITY", label: "Community" },
  { value: "STATEMENT", label: "Statement" },
  { value: "SPEECH", label: "Speech" },
] as const;

export type NewsFormValues = {
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
  live: boolean;
  imageUrl: string;
};

export function NewsForm({
  id,
  initial,
}: {
  id?: string;
  initial?: NewsFormValues;
}) {
  const router = useRouter();
  const [values, setValues] = useState<NewsFormValues>(
    initial ?? {
      date: new Date().toISOString().slice(0, 10),
      title: "",
      excerpt: "",
      category: "CAMPAIGN_UPDATE",
      readMin: 3,
      live: false,
      imageUrl: "",
    },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(id ? `/api/admin/news/${id}` : "/api/admin/news", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Failed to save");
        return;
      }
      router.push("/admin/news");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <Field label="Date">
        <input
          type="date"
          required
          value={values.date}
          onChange={(e) => setValues({ ...values, date: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Title">
        <input
          type="text"
          required
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Excerpt">
        <textarea
          required
          rows={4}
          value={values.excerpt}
          onChange={(e) => setValues({ ...values, excerpt: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Category">
        <select
          value={values.category}
          onChange={(e) => setValues({ ...values, category: e.target.value })}
          className={inputClass}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Read time (minutes)">
        <input
          type="number"
          min={1}
          value={values.readMin}
          onChange={(e) => setValues({ ...values, readMin: Number(e.target.value) })}
          className={inputClass}
        />
      </Field>

      <label className="flex items-center gap-2 mb-5 text-sm text-[#1A1A1A]">
        <input
          type="checkbox"
          checked={values.live}
          onChange={(e) => setValues({ ...values, live: e.target.checked })}
        />
        Mark as &quot;Latest&quot; (live badge)
      </label>

      <ImageUploadField
        label="Featured image (optional)"
        value={values.imageUrl}
        onChange={(url) => setValues({ ...values, imageUrl: url })}
      />

      {error && <p className="text-[#E63035] text-[13px] mb-4">{error}</p>}

      <div className="flex gap-3 mt-2">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : id ? "Save Changes" : "Create Article"}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.push("/admin/news")}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  );
}
