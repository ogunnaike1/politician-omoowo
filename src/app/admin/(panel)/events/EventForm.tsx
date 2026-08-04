"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputClass, PrimaryButton, SecondaryButton } from "../_components/ui";
import { ImageUploadField } from "../_components/ImageUploadField";

const TYPES = [
  { value: "RALLY", label: "Rally" },
  { value: "TOWN_HALL", label: "Town Hall" },
  { value: "FORUM", label: "Forum" },
  { value: "SUMMIT", label: "Summit" },
  { value: "CONSULTATION", label: "Consultation" },
] as const;

export type EventFormValues = {
  date: string;
  time: string;
  title: string;
  location: string;
  lga: string;
  type: string;
  featured: boolean;
  note: string;
  imageUrl: string;
};

export function EventForm({ id, initial }: { id?: string; initial?: EventFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<EventFormValues>(
    initial ?? {
      date: new Date().toISOString().slice(0, 10),
      time: "10:00 AM",
      title: "",
      location: "",
      lga: "",
      type: "RALLY",
      featured: false,
      note: "",
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
      const res = await fetch(id ? `/api/admin/events/${id}` : "/api/admin/events", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Failed to save");
        return;
      }
      router.push("/admin/events");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Date">
          <input
            type="date"
            required
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Time">
          <input
            type="text"
            required
            placeholder="10:00 AM"
            value={values.time}
            onChange={(e) => setValues({ ...values, time: e.target.value })}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Title">
        <input
          type="text"
          required
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Location">
        <input
          type="text"
          required
          value={values.location}
          onChange={(e) => setValues({ ...values, location: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="LGA">
        <input
          type="text"
          required
          placeholder="e.g. Ijebu-East"
          value={values.lga}
          onChange={(e) => setValues({ ...values, lga: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Type">
        <select
          value={values.type}
          onChange={(e) => setValues({ ...values, type: e.target.value })}
          className={inputClass}
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-center gap-2 mb-5 text-sm text-[#1A1A1A]">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => setValues({ ...values, featured: e.target.checked })}
        />
        Featured (highlighted on Events page)
      </label>

      <Field label="Note (shown for past events)" hint="Optional — a short recap sentence.">
        <textarea
          rows={3}
          value={values.note}
          onChange={(e) => setValues({ ...values, note: e.target.value })}
          className={inputClass}
        />
      </Field>

      <ImageUploadField
        label="Image (optional)"
        value={values.imageUrl}
        onChange={(url) => setValues({ ...values, imageUrl: url })}
      />

      {error && <p className="text-[#E63035] text-[13px] mb-4">{error}</p>}

      <div className="flex gap-3 mt-2">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : id ? "Save Changes" : "Create Event"}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.push("/admin/events")}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  );
}
