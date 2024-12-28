import ActionMenu from "@/components/shared/table/action-menu";
import { DataTableColumnHeader } from "@/components/shared/table/column-header";
import { ColumnDef } from "@tanstack/react-table";

export const columns = ({
  onDelete,
}: {
  onDelete: (subjectId: number) => void;
}): ColumnDef<SubjectTable>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const subject = row.original;

      return (
        <ActionMenu
          id={subject.id}
          resourceName="subject"
          hasView={false}
          onDelete={() => onDelete(subject.id)}
        />
      );
    },
  },
];
