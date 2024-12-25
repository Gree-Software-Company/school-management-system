/**
 * @description Queries for Semester service
 * @module SemesterQueries
 */

import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";

// Fetch all semesters
export const useFetchSemesters = () => {
  const { toast } = useToast();
  return useQuery(
    ["semesters"],
    async () => {
      const response = await apiClient.get("/semesters");
      return response.data?.semesters;
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching students",
          description: "An error occured while fetching students.",
        });
      },
    }
  );
};

// Fetch a single semester by ID
export const useFetchASemester = (semesterId: string) => {
  const { toast } = useToast();
  return useQuery(
    ["semester", semesterId],
    async () => {
      const response = await apiClient.get(`/semesters/${semesterId}`);
      return response.data?.semester;
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching student",
          description: "An error occured while fetching the student.",
        });
      },
    }
  );
};

// Create a new semester
export const useCreateSemester = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  //   const navigate = useNavigate();
  return useMutation(
    async (newSemester) => {
      const response = await apiClient.post("/semesters", newSemester);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["semesters"]);
        toast({
          title: "Semester created",
          description: "Semester created successfully.",
        });
        // navigate("/semesters");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error creating student",
          description: "An error occured while creating the student.",
        });
      },
    }
  );
};

// Update an existing semester
export const useUpdateSemester = (semesterId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  //   const navigate = useNavigate();

  return useMutation(
    async (updatedSemester) => {
      const { data } = await apiClient.put(
        `/semesters/${semesterId}`,
        updatedSemester
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["semesters"]);
        queryClient.invalidateQueries(["semester", semesterId]);
        toast({
          title: "Semester updated",
          description: "The semester was created successfully.",
        });
        // navigate("/semesters");
      },
      onError: (error: Errors) => {
        console.log(error);
        toast({
          title: "Error updating semester",
          description: `Error: ${error?.response?.data?.message}`,
        });
      },
    }
  );
};
