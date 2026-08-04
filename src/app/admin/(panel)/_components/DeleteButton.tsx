"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DangerButton } from "./ui";

export function DeleteButton({ endpoint, label = "Delete" }: { endpoint: string; label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.error || "Failed to delete");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <DangerButton type="button" onClick={onClick} disabled={loading} className="text-[11px] px-3 py-1.5">
      {loading ? "Deleting…" : label}
    </DangerButton>
  );
}
