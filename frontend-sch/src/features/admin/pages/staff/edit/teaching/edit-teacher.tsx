import Header from "@/features/admin/components/header/header";
import { useFetchTeacher } from "@/features/admin/services/staff/queries";
import { useParams } from "react-router-dom";
import EditTeacherForm from "./edit-teacher-form";

export default function EditTeacher() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : null;
  const { data: staffData } = useFetchTeacher(numericId ?? 0);
  const headerButtons = [{ title: "Go Back", link: "/admin/staff" }];
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Edit Staff"
        description="Update/Modify contents for this staff member"
        buttons={headerButtons}
      />
      {/* Form */}
      <div>
        <EditTeacherForm staffData={staffData} />
      </div>
    </section>
  );
}
