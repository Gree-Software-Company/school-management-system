import Header from "@/features/admin/components/header/header";
import { useFetchAStaff } from "@/features/admin/services/staff/queries";
import { useParams } from "react-router-dom";
import EditStaffForm from "./edit-staff-form";

export default function EditStaff() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : null;
  const { data: staffData } = useFetchAStaff(numericId ?? 0);

  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Edit Staff"
        description="Update/Modify contents for this staff member"
        buttonInfo={{ title: "Go Back", link: "/admin/staff" }}
      />
      {/* Form */}
      <div>
        <EditStaffForm staffData={staffData} />
      </div>
    </section>
  );
}
