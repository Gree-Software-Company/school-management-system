import { UserAccount } from "@/assets";
import ActionMenu from "@/components/shared/table/action-menu";
import { DataTableColumnHeader } from "@/components/shared/table/column-header";
import { ColumnDef } from "@tanstack/react-table";

export const staffColumns = ({
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
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  //   {
  //     accessorKey: "phoneNumber",
  //     header: "Phone",
  //   },
  {
    id: "actions",
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <ActionMenu
          id={staff.id}
          resourceName="staff"
          onDelete={() => onDelete(staff.id)}
        />
      );
    },
  },
];