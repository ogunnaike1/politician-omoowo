import { PageHeader } from "../../_components/ui";
import { EventForm } from "../EventForm";

export default function NewEventPage() {
  return (
    <div>
      <PageHeader title="New Event" />
      <EventForm />
    </div>
  );
}
