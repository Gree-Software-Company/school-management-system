import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function ClassesTable({
  data,
  onDelete,
}: {
  data: ClassTable[];
  onDelete: (classId: number) => void;
}) {
  return (
    <div className="p-5">
      <DataTable columns={columns({ onDelete })} data={data} />
    </div>
  );
}
