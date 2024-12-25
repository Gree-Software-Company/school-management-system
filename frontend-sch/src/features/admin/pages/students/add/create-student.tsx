import Header from "@/features/admin/components/header/header";
import CreateStudentForm from "./create-student-form";

export default function CreateStudent() {
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Student"
        description="Register a student in this school"
        buttonInfo={{
          title: "Go Back",
          link: "/admin/students",
        }}
      />
      {/* Form */}
      <div>
        <CreateStudentForm />
      </div>
    </section>
  );
}
