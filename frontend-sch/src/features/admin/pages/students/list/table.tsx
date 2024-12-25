import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function StudentTable({
  data,
  onDelete,
}: {
  data: StudentTable[];
  onDelete: (studentId: number) => void;
}) {
  return (
    <div className="p-5">
      <DataTable columns={columns({ onDelete })} data={data} />
    </div>
  );
}
