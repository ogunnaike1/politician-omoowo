"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SecondaryButton } from "../_components/ui";

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !read }),
      });
      if (res.ok) router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <SecondaryButton type="button" onClick={onClick} disabled={loading} className="text-[11px] px-3 py-1.5">
      {read ? "Mark unread" : "Mark read"}
    </SecondaryButton>
  );
}
