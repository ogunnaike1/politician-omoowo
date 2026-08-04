import Link from "next/link";
import { LogoutButton } from "./_components/LogoutButton";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/policies", label: "Policies" },
  { href: "/admin/endorsements", label: "Endorsements" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">
      <aside className="w-56 shrink-0 border-r border-[#DCDCDC] bg-white flex flex-col">
        <div className="px-5 py-6 border-b border-[#DCDCDC]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#888888]">Omoowo 2027</p>
          <p className="text-sm font-semibold text-[#1A1A1A] mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F2F2F2] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#DCDCDC]">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 px-10 py-10 max-w-4xl">{children}</main>
    </div>
  );
}
