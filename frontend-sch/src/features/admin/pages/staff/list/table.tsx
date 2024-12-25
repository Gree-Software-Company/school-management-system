import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function StaffTable({
  data,
  onDelete,
}: {
  data: StaffTable[];
  onDelete: (staffId: number) => void;
}) {
  return (
    <div className="p-5">
      <DataTable columns={columns({ onDelete })} data={data} />
    </div>
  );
}
