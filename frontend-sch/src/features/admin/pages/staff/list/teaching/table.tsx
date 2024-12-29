import { DataTable } from "@/components/ui/data-table";
import { teachingColumns } from "./columns";

export default function TeachersTable({
  data,
  onDelete,
}: {
  data: StaffTable[];
  onDelete: (staffId: number) => void;
}) {
  return (
    <div className="p-5">
      <DataTable columns={teachingColumns({ onDelete })} data={data} />
    </div>
  );
}
