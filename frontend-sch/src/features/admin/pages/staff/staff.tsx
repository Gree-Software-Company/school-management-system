import { useDeleteResource } from "@/services/api";
import Header from "../../components/header/header";
import { useFetchTeachers } from "../../services/staff/queries";
import { TableSkeleton } from "@/components/shared/loaders/loaders";
import { TableError } from "@/components/shared/loaders/errors";
import StaffTable from "./list/table";

export default function Staff() {
  const { data: staffData, isLoading, error, isError } = useFetchTeachers();
  const { mutateAsync: deleteStaff } = useDeleteResource("staff", "staff");

  const handleDeleteStaff = async (staffId: number) => {
    try {
      await deleteStaff(staffId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {/* Header */}
      <Header
        title="Staff"
        description="Manage staff"
        className="p-5"
        buttonInfo={{
          title: "Add Staff",
          link: "/admin/staff/create",
        }}
      />
      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError error={error as Errors} />
      ) : (
        <StaffTable data={staffData || []} onDelete={handleDeleteStaff} />
      )}
    </section>
  );
}
