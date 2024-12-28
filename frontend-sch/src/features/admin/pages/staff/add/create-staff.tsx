import Header from "@/features/admin/components/header/header";
import CreateStaffForm from "./create-staff-form";

export default function CreateStaff() {
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Staff"
        description="Register a staff member to the school"
        buttonInfo={{
          title: "Go Back",
          link: "/admin/staff",
        }}
      />
      {/* Form */}
      <div className="">
        <CreateStaffForm />
      </div>
    </section>
  );
}
