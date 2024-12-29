import { TableError } from "@/components/shared/loaders/errors";
import Header from "../../components/header/header";
import { useFetchClasses } from "../../services/class/queries";
import ClassesTable from "./list/table";
import { TableSkeleton } from "@/components/shared/loaders/loaders";
import { useDeleteResource } from "@/services/api";

export default function Classes() {
  const { data: classList, isLoading, error, isError } = useFetchClasses();
  const { mutateAsync: deleteClass } = useDeleteResource("class", "classes");

  const handleDeleteClass = async (classId: number) => {
    // console.log("Delete class", classId);
    // Implement your delete logic here
    try {
      await deleteClass(classId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      {/* Header */}
      <Header
        title="Classes"
        description="Manage classes"
        className="p-5"
        buttons={[
          {
            title: "Create Class",
            link: "/admin/class/create",
            variant: "default",
          },
        ]}
      />
      {/* Data Table */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError error={error as Errors} />
      ) : (
        <ClassesTable data={classList || []} onDelete={handleDeleteClass} />
      )}
    </section>
  );
}
