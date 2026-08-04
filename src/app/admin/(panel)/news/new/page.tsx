import { PageHeader } from "../../_components/ui";
import { NewsForm } from "../NewsForm";

export default function NewNewsPage() {
  return (
    <div>
      <PageHeader title="New Article" />
      <NewsForm />
    </div>
  );
}
