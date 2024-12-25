import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * @description Queries for class service
 * @module ClassQueries
 * @deleteClass Generalized into DeleteResource function
 */

/**
 * @Query Fetch all classes
 */

export const useFetchClasses = () => {
  const { toast } = useToast();
  return useQuery(
    ["classes"],
    async () => {
      try {
        const response = await apiClient.get("/class");
        return response.data?.data;
      } catch (error) {
        console.log("Error fetching classes", error);
      }
    },
    {
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error fetching classes",
          className: "bg-destructive text-white",
          description: "An error occurred while fetching classes",
        });
      },
    }
  );
};

/**
 * @Query Fetch a class
 */
export const useFetchAClass = (classId: number) => {
  const { toast } = useToast();
  return useQuery(
    ["class", classId],
    async () => {
      try {
        const response = await apiClient.get(`/class/${classId}`);
        return response.data;
      } catch (error) {
        console.log("Error fetching class", error);
      }
    },
    {
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error fetching class",
          className: "bg-destructive text-white",
          description: "An error occurred while fetching class",
        });
      },
    }
  );
};

/**
 * @Mutation Create a class
 */
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    async (classData: CreateClassForm) => {
      try {
        const response = await apiClient.post("/class", classData);
        return response.data;
      } catch (error) {
        console.log("Error creating class", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["classes"]);
        toast({
          title: "Class created",
          description: "Class created successfully",
        });
        navigate("/admin/class");
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error creating class",
          className: "bg-destructive text-white",
          description: "An error occurred while creating class",
        });
      },
    }
  );
};

/**
 * @Mutation Update a class
 */
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    async (data: UpdateClassForm) => {
      try {
        const response = await apiClient.put(`/class/${data.id}`, data);
        return response.data;
      } catch (error) {
        console.log("Error updating class", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["classes"]);
        toast({
          title: "Class updated",
          description: "Class updated successfully",
        });
        navigate("/admin/class");
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error updating class",
          className: "bg-destructive text-white",
          description: "An error occurred while updating class",
        });
      },
    }
  );
};
