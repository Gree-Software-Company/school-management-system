import Header from "@/features/admin/components/header/header";
import { useFetchAClass } from "@/features/admin/services/class/queries";
import { useParams } from "react-router-dom";
import EditClassForm from "./edit-class-form";

export default function EditClass() {
  const { id } = useParams<{ id: string }>();
  const { data: classData } = useFetchAClass(parseInt(id || "0"));

  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Edit Class"
        description="Update/Modify contents for this class"
        buttonInfo={{ title: "Go Back", link: "/admin/class" }}
      />
      {/* Form */}
      <div>
        <EditClassForm classData={classData} />
      </div>
    </section>
  );
}
