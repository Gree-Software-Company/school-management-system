import { useDeleteResource } from "@/services/api";
import Header from "../../components/header/header";
import { useFetchSubjects } from "../../services/subjects/queries";
import { TableSkeleton } from "@/components/shared/loaders/loaders";
import { TableError } from "@/components/shared/loaders/errors";
import SubjectsTable from "./list/table";

export default function Subjects() {
  const { data: subjectsData, isLoading, error, isError } = useFetchSubjects();
  const { mutateAsync: deleteSubject } = useDeleteResource(
    "subjects",
    "subjects"
  );

  const handleDeleteSubject = async (subjectId: number) => {
    try {
      await deleteSubject(subjectId);
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  return (
    <section>
      {/* Header */}
      <Header
        title="Subjects"
        description="Manage subjects"
        className="p-5"
        buttons={[
          {
            title: "Create Subject",
            link: "/admin/subjects/create",
            variant: "default",
          },
        ]}
      />
      {/* Data table */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <TableError error={error as Errors} />
      ) : (
        <SubjectsTable data={subjectsData} onDelete={handleDeleteSubject} />
      )}
    </section>
  );
}
