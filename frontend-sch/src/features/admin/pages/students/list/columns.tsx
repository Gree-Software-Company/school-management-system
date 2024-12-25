import ActionMenu from "@/components/shared/table/action-menu";
import { DataTableColumnHeader } from "@/components/shared/table/column-header";
import { ColumnDef } from "@tanstack/react-table";

export const columns = ({
  onDelete,
}: {
  onDelete: (studentId: number) => void;
}): ColumnDef<StudentTable>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const { gender } = row.original;
      return <p className="capitalize">{gender}</p>;
    },
  },
  {
    accessorKey: "class.name",
    header: "Class",
    cell: ({ row }) => {
      const classData = row.original;
      return <p>{classData?.class?.name}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <ActionMenu
          id={student.id}
          resourceName="student"
          onDelete={() => onDelete(student.id)}
        />
      );
    },
  },
];
