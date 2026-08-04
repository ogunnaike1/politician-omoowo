import type { NewsCategory, EventType } from "./database.types";

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  PRESS_RELEASE: "Press Release",
  CAMPAIGN_UPDATE: "Campaign Update",
  COMMUNITY: "Community",
  STATEMENT: "Statement",
  SPEECH: "Speech",
};

export const EVENT_TYPE_LABEL: Record<EventType, string> = {
  RALLY: "Rally",
  TOWN_HALL: "Town Hall",
  FORUM: "Forum",
  SUMMIT: "Summit",
  CONSULTATION: "Consultation",
};

function toDate(date: Date | string): Date {
  return typeof date === "string" ? new Date(date) : date;
}

/** Formats a Date as "18 Jul 2026" to match the site's existing date display. */
export function formatDisplayDate(date: Date | string): string {
  const d = toDate(date);
  const day = d.getUTCDate();
  const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/** Formats a Date as "02 August 2026" (full month name, zero-padded day). */
export function formatFullDate(date: Date | string): string {
  const d = toDate(date);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function formatDayNum(date: Date | string): string {
  return String(toDate(date).getUTCDate()).padStart(2, "0");
}

export function formatMonthShort(date: Date | string): string {
  return toDate(date).toLocaleString("en-US", { month: "short", timeZone: "UTC" });
}

export function formatYear(date: Date | string): string {
  return String(toDate(date).getUTCFullYear());
}

/**
 * Combines a stored event date (day precision) with a free-text time label
 * like "10:00 AM" into a single ISO datetime string for countdown purposes.
 * Falls back to midnight on that date if the time can't be parsed.
 */
export function combineDateAndTime(date: Date | string, time: string): string {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  const combined = new Date(toDate(date));
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    combined.setUTCHours(hours, minutes, 0, 0);
  }
  return combined.toISOString();
}
