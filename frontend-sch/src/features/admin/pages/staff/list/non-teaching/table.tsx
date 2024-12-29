import { DataTable } from "@/components/ui/data-table";
import { staffColumns } from "./columns";

export default function StaffTable({
  data,
  onDelete,
}: {
  data: StaffTable[];
  onDelete: (staffId: number) => void;
}) {
  return (
    <div className="p-5">
      <DataTable columns={staffColumns({ onDelete })} data={data} />
    </div>
  );
}
