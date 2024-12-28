import Header from "@/features/admin/components/header/header";
import EditStudentForm from "./edit-student-form";
import { useParams } from "react-router-dom";
import { useFetchAStudent } from "@/features/admin/services/students/queries";

export default function EditStudents() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : null;
  const { data: studentData } = useFetchAStudent(numericId ?? 0);

  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Edit Student"
        description="Update/Modify contents for this student"
        buttonInfo={{ title: "Go Back", link: "/admin/students" }}
      />
      {/* Form */}
      <div>
        <EditStudentForm data={studentData} />
      </div>
    </section>
  );
}
