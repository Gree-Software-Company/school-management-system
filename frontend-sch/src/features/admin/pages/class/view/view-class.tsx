import { useFetchAClass } from "@/features/admin/services/class/queries";
import { useParams } from "react-router-dom";

export default function ViewClass() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id) : null;
  const {
    data: classData,
    isLoading,
    error,
    isError,
  } = useFetchAClass(numericId ?? 0);

  return <div>ViewClass</div>;
}
