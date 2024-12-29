import Header from "@/features/admin/components/header/header";
import CreateTeacherForm from "./create-teacher-form";

export default function CreateTeacher() {
  const headerButtons = [{ title: "Go Back", link: "/admin/staff" }];
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Teacher"
        description="Register a teaching staff for the school."
        buttons={headerButtons}
      />
      {/* Form */}
      <div className="">
        <CreateTeacherForm />
      </div>
    </section>
  );
}
