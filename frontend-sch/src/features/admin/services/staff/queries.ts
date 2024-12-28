/**
 * @description Queries for Staff service
 * @module StaffQueries
 */

import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * @Query Fetch all teaching staff
 */
export const useFetchTeachers = () => {
  const { toast } = useToast();
  return useQuery(
    ["staff"],
    async () => {
      try {
        const response = await apiClient.get("/staff");
        return response.data?.staff;
      } catch (error) {
        console.log("Error fetching teaching staff", error);
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching teaching staff",
          description: "An error occured while fetching teaching staff",
        });
      },
    }
  );
};

export const useFetchAStaff = (teacherId: number) => {
  const { toast } = useToast();
  return useQuery(
    ["teacher", teacherId],
    async () => {
      try {
        const response = await apiClient.get(`/staff/${teacherId}`);
        return response.data?.data;
      } catch (error) {
        console.log("Error fetching teaching staff", error);
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching teaching staff",
          description: "An error occured while fetching teaching staff",
        });
      },
    }
  );
};

/**
 * @Mutation Create a new teacher
 */
export const useCreateStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    async (data: CreateStaffForm) => {
      try {
        const response = await apiClient.post("/staff", data);
        return response.data?.staff;
      } catch (error) {
        console.log("Error creating teaching staff", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["staff"]);
        toast({
          title: "Teacher created successfully",
          description: "Teacher has been created successfully",
        });
        navigate("/admin/staff");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error creating teaching staff",
          description: "An error occured while creating teaching staff",
        });
      },
    }
  );
};

/**
 * @Mutation Update a teacher
 */
export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    async (data: UpdateStaffForm) => {
      try {
        const response = await apiClient.put(`/staff/${data.id}`, data);
        return response.data?.staff;
      } catch (error) {
        console.log("Error updating teaching staff", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["staff"]);
        toast({
          title: "Teacher updated successfully",
          description: "Teacher has been updated successfully",
        });
        navigate("/admin/staff");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error updating teaching staff",
          description: "An error occured while updating teaching staff",
        });
      },
    }
  );
};
