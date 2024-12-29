import Header from "@/features/admin/components/header/header";
import CreateClassForm from "./create-class-form";

export default function CreateClass() {
  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Create Class"
        description="Register a class for the school"
        buttons={[
          {
            title: "Go Back",
            link: "/admin/class",
            variant: "default",
          },
        ]}
      />
      {/* Form */}
      <div className="">
        <CreateClassForm />
      </div>
    </section>
  );
}
