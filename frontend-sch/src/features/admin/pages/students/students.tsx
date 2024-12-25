import Header from "../../components/header/header";

export default function Students() {
  return (
    <section>
      {/* Header */}
      <Header
        title="Students"
        description="Manage students in this school"
        className="p-5"
        buttonInfo={{
          title: "Add Student",
          link: "/admin/students/create",
        }}
      />
      {/* Data table */}
    </section>
  );
}
