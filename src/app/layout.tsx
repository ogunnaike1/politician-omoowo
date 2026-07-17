import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omoowo 2027 — Ogun East Senatorial Campaign",
  description:
    "Alhaji Abdulhameed Oluwafemi Omotayo (Omoowo) — PDP candidate for the Ogun East Senatorial District seat in the 2027 National Assembly elections.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
