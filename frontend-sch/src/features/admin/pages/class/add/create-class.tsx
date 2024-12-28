import Header from "@/features/admin/components/header/header";
import CreateClassForm from "./create-class-form";

export default function CreateClass() {
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Class"
        description="Register a class for the school"
        buttonInfo={{ title: "Go Back", link: "/admin/class" }}
      />
      {/* Form */}
      <div className="">
        <CreateClassForm />
      </div>
    </section>
  );
}
