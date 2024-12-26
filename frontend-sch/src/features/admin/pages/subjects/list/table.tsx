import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function SubjectsTable({
  data,
  onDelete,
}: {
  data: SubjectTable[];
  onDelete: (subjectId: number) => void;
}) {
  return (
    <div className="p-5">
      <DataTable columns={columns({ onDelete })} data={data} />
    </div>
  );
}
