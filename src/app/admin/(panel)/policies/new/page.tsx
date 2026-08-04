import { PageHeader } from "../../_components/ui";
import { PolicyForm } from "../PolicyForm";

export default function NewPolicyPage() {
  return (
    <div>
      <PageHeader title="New Policy" />
      <PolicyForm />
    </div>
  );
}
