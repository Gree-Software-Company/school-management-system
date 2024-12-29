import { UserAccount } from "@/assets";
import ActionMenu from "@/components/shared/table/action-menu";
import { DataTableColumnHeader } from "@/components/shared/table/column-header";
import { ColumnDef } from "@tanstack/react-table";

export const teachingColumns = ({
  onDelete,
}: {
  onDelete: (staffId: number) => void;
}): ColumnDef<StaffTable>[] => [
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <div className="flex items-center">
          <img
            src={staff.profile?.imageUrl || UserAccount}
            alt="profile"
            className="w-10 h-10 rounded-full bg-background"
            loading="lazy"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "classes[0]?.name",
    header: "Class",
    cell: ({ row }) => {
      const classData = row.original;
      return (
        <p>
          {!classData?.classes || classData?.classes.length === 0
            ? "N/A"
            : classData?.classes[0]?.name}
        </p>
      );
    },
  },
  //   {
  //     accessorKey: "phoneNumber",
  //     header: "Phone",
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      const teacher = row.original;

      return (
        <ActionMenu
          id={teacher.id}
          resourceName="teacher"
          hasSubEdit={true}
          hasEdit={false}
          subEditText="teachers"
          onDelete={() => onDelete(teacher.id)}
        />
      );
    },
  },
];
