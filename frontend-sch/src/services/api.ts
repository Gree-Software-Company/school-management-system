import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./axios-instance";
import { useToast } from "@/hooks/use-toast";

/**
 * Delete a resource and handle errors.
 * @param resource - API endpoint for the resource (e.g., "users","staff","students","classes").
 */
export const useDeleteResource = (resource: string, queryKey: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (id: string | number) => apiClient.delete(`/${resource}/${id}`),
    {
      onMutate: (id) => {
        toast({
          title: "Deleting...",
          description: `Deleting ${resource} with ID ${id}...`,
        });
      },
      onSuccess: () => {
        // Invalidate the query to refresh the table
        queryClient.invalidateQueries([queryKey]);
        toast({
          title: "Deleted",
          description: `${resource} deleted successfully.`,
        });
      },
      onError: (error, id) => {
        console.error(error);
        toast({
          title: "Error",
          description: `Failed to delete ${resource} with ID ${id}.`,
        });
      },
    }
  );
};
