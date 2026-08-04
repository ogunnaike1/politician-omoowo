"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const onClick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      className="w-full text-left text-sm text-[#888888] hover:text-[#E63035] transition-colors"
    >
      Log out
    </button>
  );
}
