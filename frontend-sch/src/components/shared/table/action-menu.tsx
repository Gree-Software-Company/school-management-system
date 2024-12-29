import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const ActionMenu = ({
  id,
  resourceName,
  onDelete,
  hasEdit = true,
  hasDelete = true,
  hasSubView = false,
  hasSubEdit = false,
  hasView = true,
  subEditText,
}: {
  id?: string | number;
  resourceName: string;
  onDelete: (id: string | number) => void;
  hasEdit?: boolean;
  hasDelete?: boolean;
  hasSubView?: boolean;
  hasSubEdit?: boolean;
  hasView?: boolean;
  subEditText?: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null); // Clear any previous errors
    try {
      if (id !== undefined) {
        await onDelete(id);
      } else {
        setError(`Failed to delete ${resourceName}. Invalid ID.`);
      }
    } catch (err) {
      console.log(err);
      console.log(error);
      setError(`Failed to delete ${resourceName}. Please try again.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {hasView && (
          <DropdownMenuItem>
            <Link to={`${id}`}>View {resourceName}</Link>
          </DropdownMenuItem>
        )}
        {hasSubView && (
          <DropdownMenuItem>
            <Link to={`${resourceName}/${id}`}>View {resourceName}</Link>
          </DropdownMenuItem>
        )}
        {hasEdit && (
          <DropdownMenuItem>
            <Link to={`${id}/edit`} replace>
              Edit {resourceName}
            </Link>
          </DropdownMenuItem>
        )}
        {hasSubEdit && (
          <DropdownMenuItem>
            <Link to={`${subEditText}/${id}/edit`} replace>
              Edit {resourceName}
            </Link>
          </DropdownMenuItem>
        )}
        {hasDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="bg-red-500 hover:bg-red-600 text-white"
                onSelect={(e) => e.preventDefault()}
              >
                Delete {resourceName}
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  This action cannot be undone. This will delete{" "}
                  <span className="font-bold text-black dark:text-white">
                    {resourceName + " " + id}
                  </span>{" "}
                  and remove their data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className=""
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
