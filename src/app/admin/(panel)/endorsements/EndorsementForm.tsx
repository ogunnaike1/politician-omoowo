"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputClass, PrimaryButton, SecondaryButton } from "../_components/ui";

export type EndorsementFormValues = {
  order: number;
  quote: string;
  name: string;
  role: string;
};

export function EndorsementForm({ id, initial }: { id?: string; initial?: EndorsementFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<EndorsementFormValues>(
    initial ?? { order: 0, quote: "", name: "", role: "" },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(id ? `/api/admin/endorsements/${id}` : "/api/admin/endorsements", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Failed to save");
        return;
      }
      router.push("/admin/endorsements");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <Field label="Order" hint="Lower numbers appear first.">
        <input
          type="number"
          value={values.order}
          onChange={(e) => setValues({ ...values, order: Number(e.target.value) })}
          className={inputClass}
        />
      </Field>

      <Field label="Quote">
        <textarea
          required
          rows={4}
          value={values.quote}
          onChange={(e) => setValues({ ...values, quote: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Name">
        <input
          type="text"
          required
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Role / Affiliation">
        <input
          type="text"
          required
          value={values.role}
          onChange={(e) => setValues({ ...values, role: e.target.value })}
          className={inputClass}
        />
      </Field>

      {error && <p className="text-[#E63035] text-[13px] mb-4">{error}</p>}

      <div className="flex gap-3 mt-2">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : id ? "Save Changes" : "Create Endorsement"}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.push("/admin/endorsements")}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  );
}
