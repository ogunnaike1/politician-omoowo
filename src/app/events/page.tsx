import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import {
  EVENT_TYPE_LABEL,
  formatDayNum,
  formatMonthShort,
  formatYear,
  formatFullDate,
  formatDisplayDate,
  combineDateAndTime,
} from "@/lib/format";
import EventsPageClient, { CEvent, PastEventItem, NextEventInfo } from "./EventsPageClient";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const { data: events, error } = await supabase.from("events").select("*").order("date", { ascending: true });
  if (error) throw new Error(error.message);

  const now = new Date();

  const upcomingRaw = events.filter((e) => new Date(e.date) >= now);
  const pastRaw = events.filter((e) => new Date(e.date) < now);

  const upcoming: CEvent[] = upcomingRaw.map((e) => ({
    id: e.id,
    day: formatDayNum(e.date),
    month: formatMonthShort(e.date),
    year: formatYear(e.date),
    time: e.time,
    title: e.title,
    location: e.location,
    lga: e.lga,
    type: EVENT_TYPE_LABEL[e.type] as CEvent["type"],
    featured: e.featured,
  }));

  const past: PastEventItem[] = pastRaw.map((e) => ({
    id: e.id,
    date: formatDisplayDate(e.date),
    title: e.title,
    location: e.location,
    note: e.note ?? "",
  }));

  const soonest = upcomingRaw[0];
  const nextEvent: NextEventInfo | null = soonest
    ? {
        title: soonest.title,
        location: soonest.location,
        dateLabel: formatFullDate(soonest.date),
        timeLabel: `${soonest.time} WAT`,
        countdownTarget: combineDateAndTime(soonest.date, soonest.time),
      }
    : null;

  return (
    <>
      <Nav />
      <main>
        <EventsPageClient upcoming={upcoming} past={past} nextEvent={nextEvent} />
      </main>
      <Footer />
    </>
  );
}
