import { useDeleteResource } from "@/services/api";
import Header from "../../components/header/header";
import { useFetchStudents } from "../../services/students/queries";
import { TableSkeleton } from "@/components/shared/loaders/loaders";
import { TableError } from "@/components/shared/loaders/errors";
import StudentTable from "./list/table";

export default function Students() {
  const { data: studentsList, isLoading, error, isError } = useFetchStudents();
  const { mutateAsync: deleteStudent } = useDeleteResource(
    "students",
    "students"
  );

  const handleDeleteStudent = async (studentId: number) => {
    try {
      await deleteStudent(studentId);
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <section>
      {/* Header */}
      <Header
        title="Students"
        description="Manage students in this school"
        className="p-5"
        buttons={[
          {
            title: "Add Student",
            link: "/admin/students/create",
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
        <StudentTable data={studentsList} onDelete={handleDeleteStudent} />
      )}
    </section>
  );
}
