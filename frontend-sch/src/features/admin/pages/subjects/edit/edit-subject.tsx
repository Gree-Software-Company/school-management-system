import Header from "@/features/admin/components/header/header";
import { useParams } from "react-router-dom";
import EditSubjectForm from "./edit-subject-form";

export default function EditSubject() {
  const { id } = useParams<{ id: string }>();
  // const {data:subjectData} =
  const data = {
    id: "1",
    name: "Mathematics",
  };
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Edit Subject"
        description="Update/Modify contents for this subject"
        buttons={[
          {
            title: "Go Back",
            link: "/admin/subjects",
            variant: "default",
          },
        ]}
      />
      {/* Form */}
      <div>
        <EditSubjectForm subjectData={data} />
      </div>
    </section>
  );
}
