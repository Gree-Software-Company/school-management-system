import { DataTableColumnHeader } from "@/components/shared/table/column-header";
import { ColumnDef } from "@tanstack/react-table";
import ActionMenu from "@/components/shared/table/action-menu";

export const columns = ({
  onDelete,
}: ClassColumns): ColumnDef<ClassTable>[] => [
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
    accessorKey: "teacher.firstName",
    header: "Teacher",
    cell: ({ row }) => {
      const teacher = row.original.teacher;

      return `${teacher?.firstName} ${teacher?.lastName}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const classes = row.original;

      return (
        <ActionMenu
          id={classes.id}
          resourceName="class"
          onDelete={() => onDelete(classes.id.toString())}
        />
      );
    },
  },
];
