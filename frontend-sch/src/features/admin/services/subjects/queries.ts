/**
 * @description Queries for Subjects service
 * @module SubjectQueries
 */

import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * @Query Fetch all subjects
 */
export const useFetchSubjects = () => {
  const { toast } = useToast();
  return useQuery(
    ["subjects"],
    async () => {
      try {
        const response = await apiClient.get("/subjects");
        return response.data?.subjects;
      } catch (error) {
        console.log("Error fetching subjects", error);
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching subjects",
          description: "An error occured while fetching subjects.",
        });
      },
    }
  );
};

/**
 * @Mutation Create a new subject
 */
export const useCreateSubject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async (data: CreateSubjectForm) => {
      try {
        const response = await apiClient.post("/subjects", data);
        return response.data;
      } catch (error) {
        console.log("Error creating subject", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subjects"]);
        toast({
          title: "Subject created",
          description: "The subject was created successfully.",
        });
        navigate("/admin/subjects");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error creating subject",
          description: "An error occured while creating subject.",
        });
      },
    }
  );
};

/**
 * @Mutation Update a subject
 */
export const useUpdateSubject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    async ({ id, data }: { id: string; data: UpdateSubjectForm }) => {
      try {
        const response = await apiClient.put(`/subjects/${id}`, data);
        return response.data;
      } catch (error) {
        console.log("Error updating subject", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subjects"]);
        toast({
          title: "Subject updated",
          description: "The subject was updated successfully.",
        });
        navigate("/admin/subjects");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error updating subject",
          description: "An error occured while updating subject.",
        });
      },
    }
  );
};
