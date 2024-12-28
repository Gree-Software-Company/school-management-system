import Header from "@/features/admin/components/header/header";
import CreateSubjectForm from "./create-subject-form";

export default function CreateSubject() {
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Subject"
        description="Register a subject"
        buttonInfo={{
          title: "Go Back",
          link: "/admin/subjects",
        }}
      />
      {/* Form */}
      <div>
        <CreateSubjectForm />
      </div>
    </section>
  );
}
