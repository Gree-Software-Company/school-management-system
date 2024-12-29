import Header from "@/features/admin/components/header/header";
import CreateStaffForm from "./create-staff-form";

export default function CreateStaff() {
  const headerButtons = [{ title: "Go Back", link: "/admin/staff" }];
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Non-Teaching Staff"
        description="Register a non-teaching staff for the school."
        buttons={headerButtons}
      />
      {/* Form */}
      <div className="">
        <CreateStaffForm />
      </div>
    </section>
  );
}
