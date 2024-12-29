import { useDeleteResource } from "@/services/api";
import Header from "../../components/header/header";
import { useFetchStaff, useFetchTeachers } from "../../services/staff/queries";
import { TableSkeleton } from "@/components/shared/loaders/loaders";
import { TableError } from "@/components/shared/loaders/errors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachersTable from "./list/teaching/table";
import StaffTable from "./list/non-teaching/table";

export default function Staff() {
  const { data: teachingData, isLoading, error, isError } = useFetchTeachers();
  const {
    data: staffData,
    isLoading: staffLoader,
    error: staffError,
    isError: isStaffError,
  } = useFetchStaff();
  const { mutateAsync: deleteTeacher } = useDeleteResource(
    "staff/teachers",
    "teachers"
  );
  const { mutateAsync: deleteStaff } = useDeleteResource("staffs", "staff");

  const handleDeleteTeacher = async (teacherId: number) => {
    try {
      await deleteTeacher(teacherId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteStaff = async (staffId: number) => {
    try {
      await deleteStaff(staffId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {/* Header */}
      <Header
        title="Staff"
        description="Manage staff"
        className="p-5"
        buttons={[
          {
            title: "Add Teacher",
            link: "/admin/staff/teachers/create",
            variant: "default",
          },
          {
            title: "Add Non-Teacher",
            link: "/admin/staff/create",
            variant: "outline",
          },
        ]}
      />
      {/* Staff Tabs */}
      <Tabs defaultValue="teachers" className="w-full p-5">
        <TabsList>
          <TabsTrigger value="teachers">Teaching Staff</TabsTrigger>
          <TabsTrigger value="non-teachers">Non-Teaching Staff</TabsTrigger>
        </TabsList>
        <TabsContent value="teachers">
          {/* Teaching Data Table */}
          {isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <TableError error={error as Errors} />
          ) : (
            <TeachersTable
              data={teachingData || []}
              onDelete={handleDeleteTeacher}
            />
          )}
        </TabsContent>
        <TabsContent value="non-teachers">
          {staffLoader ? (
            <TableSkeleton />
          ) : isStaffError ? (
            <TableError error={staffError as Errors} />
          ) : (
            <StaffTable data={staffData || []} onDelete={handleDeleteStaff} />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
