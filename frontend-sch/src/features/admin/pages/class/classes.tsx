import Header from "../../components/header/header";
import ClassesTable from "./list/table";

export default function Classes() {
  return (
    <section className="">
      {/* Header */}
      <Header
        title="Classes"
        description="Manage classes"
        buttonInfo={{
          title: "Create Class",
          link: "/admin/class/create",
        }}
      />
      {/* Data Table */}
      <ClassesTable
        data={[
          { id: 1, name: "Class 1" },
          { id: 2, name: "Class 2" },
          { id: 3, name: "Class 3" },
          { id: 4, name: "Class 4" },
        ]}
      />
    </section>
  );
}
