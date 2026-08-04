"use client";

import { useState } from "react";

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-[10px] text-[#008B4D] hover:underline truncate block text-left"
      title={url}
    >
      {copied ? "Copied!" : "Copy URL"}
    </button>
  );
}
