"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, inputClass, PrimaryButton } from "../_components/ui";
import { ImageUploadField } from "../_components/ImageUploadField";

export type SettingsFormValues = {
  candidateFullName: string;
  knownAs: string;
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroSubtitle: string;
  heroBody: string;
  heroImageUrl: string;
  candidateBio: string;
  candidateImageUrl: string;
  profileBio: string;
  profileImageUrl: string;
  contactOfficeAddress: string;
  contactEmail: string;
  contactWhatsapp: string;
  whatsappShareMessage: string;
};

export function SettingsForm({ initial }: { initial: SettingsFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof SettingsFormValues>(key: K, value: SettingsFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const payload = {
        ...values,
        candidateBio: values.candidateBio.split("\n\n").map((p) => p.trim()).filter(Boolean),
        profileBio: values.profileBio.split("\n\n").map((p) => p.trim()).filter(Boolean),
      };
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Failed to save");
        return;
      }
      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl">
      <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4 uppercase tracking-wide">Candidate</h2>
      <Field label="Full name">
        <input
          type="text"
          value={values.candidateFullName}
          onChange={(e) => set("candidateFullName", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Known as">
        <input
          type="text"
          value={values.knownAs}
          onChange={(e) => set("knownAs", e.target.value)}
          className={inputClass}
        />
      </Field>

      <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4 mt-8 uppercase tracking-wide">Homepage Hero</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Headline line 1">
          <input
            type="text"
            value={values.heroHeadlineLine1}
            onChange={(e) => set("heroHeadlineLine1", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Headline line 2">
          <input
            type="text"
            value={values.heroHeadlineLine2}
            onChange={(e) => set("heroHeadlineLine2", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Subtitle tag">
        <input
          type="text"
          value={values.heroSubtitle}
          onChange={(e) => set("heroSubtitle", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Body paragraph">
        <textarea
          rows={3}
          value={values.heroBody}
          onChange={(e) => set("heroBody", e.target.value)}
          className={inputClass}
        />
      </Field>
      <ImageUploadField label="Hero photo" value={values.heroImageUrl} onChange={(url) => set("heroImageUrl", url)} />

      <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4 mt-8 uppercase tracking-wide">
        Candidate Section (homepage)
      </h2>
      <Field label="Short bio" hint="Separate paragraphs with a blank line.">
        <textarea
          rows={5}
          value={values.candidateBio}
          onChange={(e) => set("candidateBio", e.target.value)}
          className={inputClass}
        />
      </Field>
      <ImageUploadField
        label="Candidate photo"
        value={values.candidateImageUrl}
        onChange={(url) => set("candidateImageUrl", url)}
      />

      <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4 mt-8 uppercase tracking-wide">Profile Page</h2>
      <Field label="Full biography" hint="Separate paragraphs with a blank line.">
        <textarea
          rows={8}
          value={values.profileBio}
          onChange={(e) => set("profileBio", e.target.value)}
          className={inputClass}
        />
      </Field>
      <ImageUploadField
        label="Profile photo"
        value={values.profileImageUrl}
        onChange={(url) => set("profileImageUrl", url)}
      />

      <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4 mt-8 uppercase tracking-wide">Contact</h2>
      <Field label="Office address">
        <input
          type="text"
          value={values.contactOfficeAddress}
          onChange={(e) => set("contactOfficeAddress", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="Email">
        <input
          type="email"
          value={values.contactEmail}
          onChange={(e) => set("contactEmail", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="WhatsApp number">
        <input
          type="text"
          value={values.contactWhatsapp}
          onChange={(e) => set("contactWhatsapp", e.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label="WhatsApp share message" hint="Used by the 'Support' modal's share tab.">
        <textarea
          rows={3}
          value={values.whatsappShareMessage}
          onChange={(e) => set("whatsappShareMessage", e.target.value)}
          className={inputClass}
        />
      </Field>

      {error && <p className="text-[#E63035] text-[13px] mb-4">{error}</p>}
      {saved && !error && <p className="text-[#008B4D] text-[13px] mb-4">Saved.</p>}

      <PrimaryButton type="submit" disabled={saving} className="mt-2">
        {saving ? "Saving…" : "Save Settings"}
      </PrimaryButton>
    </form>
  );
}
