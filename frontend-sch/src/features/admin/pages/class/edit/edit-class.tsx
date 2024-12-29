import Header from "@/features/admin/components/header/header";
import { useParams } from "react-router-dom";
import EditClassForm from "./edit-class-form";
import { useFetchAClass } from "@/features/admin/services/class/queries";

export default function EditClass() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : null;
  const { data: classData } = useFetchAClass(numericId ?? 0);

  return (
    <section className="w-full max-w-6xl mx-auto py-4 space-y-10">
      {/* Header */}
      <Header
        title="Edit Class"
        description="Update/Modify contents for this class"
        buttons={[{ title: "Go Back", link: "/admin/class" }]}
      />
      {/* Form */}
      <div>
        {numericId !== undefined && <EditClassForm classData={classData} />}
      </div>
    </section>
  );
}
