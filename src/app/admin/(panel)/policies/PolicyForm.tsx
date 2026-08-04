"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputClass, PrimaryButton, SecondaryButton } from "../_components/ui";

export type PolicyFormValues = {
  order: number;
  title: string;
  tagline: string;
  summary: string;
  commitments: string;
  impact: string;
  accentColor: string;
};

export function PolicyForm({ id, initial }: { id?: string; initial?: PolicyFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PolicyFormValues>(
    initial ?? {
      order: 0,
      title: "",
      tagline: "",
      summary: "",
      commitments: "",
      impact: "",
      accentColor: "#008B4D",
    },
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...values,
        commitments: values.commitments
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      };
      const res = await fetch(id ? `/api/admin/policies/${id}` : "/api/admin/policies", {
        method: id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Failed to save");
        return;
      }
      router.push("/admin/policies");
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

      <Field label="Title">
        <input
          type="text"
          required
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Tagline">
        <input
          type="text"
          required
          value={values.tagline}
          onChange={(e) => setValues({ ...values, tagline: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Summary">
        <textarea
          required
          rows={4}
          value={values.summary}
          onChange={(e) => setValues({ ...values, summary: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Commitments" hint="One commitment per line.">
        <textarea
          rows={5}
          value={values.commitments}
          onChange={(e) => setValues({ ...values, commitments: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Expected Impact">
        <textarea
          required
          rows={3}
          value={values.impact}
          onChange={(e) => setValues({ ...values, impact: e.target.value })}
          className={inputClass}
        />
      </Field>

      <Field label="Accent color" hint="Hex color, e.g. #008B4D or #E63035">
        <input
          type="text"
          value={values.accentColor}
          onChange={(e) => setValues({ ...values, accentColor: e.target.value })}
          className={inputClass}
        />
      </Field>

      {error && <p className="text-[#E63035] text-[13px] mb-4">{error}</p>}

      <div className="flex gap-3 mt-2">
        <PrimaryButton type="submit" disabled={saving}>
          {saving ? "Saving…" : id ? "Save Changes" : "Create Policy"}
        </PrimaryButton>
        <SecondaryButton type="button" onClick={() => router.push("/admin/policies")}>
          Cancel
        </SecondaryButton>
      </div>
    </form>
  );
}
