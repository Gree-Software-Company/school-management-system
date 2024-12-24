import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function ClassesTable({ data }: { data: Classes[] }) {
  return (
    <div className="p-5">
      <DataTable columns={columns} data={data} />;
    </div>
  );
}
