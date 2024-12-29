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
    ["teachers"],
    async () => {
      try {
        const response = await apiClient.get("/staff/teachers");
        return response.data?.teachers;
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

export const useFetchTeacher = (teacherId: number) => {
  const { toast } = useToast();
  return useQuery(
    ["teacher", teacherId],
    async () => {
      try {
        const response = await apiClient.get(`/staff/teachers/${teacherId}`);
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
export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    async (data: CreateTeacherForm) => {
      try {
        const response = await apiClient.post("/staff/teachers", data);
        return response.data?.staff;
      } catch (error) {
        console.log("Error creating teaching staff", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["teachers"]);
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
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation(
    async (data: UpdateStaffForm) => {
      try {
        const response = await apiClient.put(
          `/staff/teachers/${data.id}`,
          data
        );
        return response.data?.staff;
      } catch (error) {
        console.log("Error updating teaching staff", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["teacher"]);
        queryClient.invalidateQueries(["teachers"]);
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

/**
 * @Query Fetch all staff members
 */
export const useFetchStaff = () => {
  const { toast } = useToast();
  return useQuery(
    ["staffs"],
    async () => {
      try {
        const response = await apiClient.get("/staff");
        return response.data?.staff;
      } catch (error) {
        console.log("Error fetching staff", error);
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching staff",
          description: "An error occured while fetching staff",
        });
      },
    }
  );
};

/**
 * @Query Fetch a staff member
 */
export const useFetchStaffMember = (staffId: number) => {
  const { toast } = useToast();
  return useQuery(
    ["staff", staffId],
    async () => {
      try {
        const response = await apiClient.get(`/staff/${staffId}`);
        return response.data?.data;
      } catch (error) {
        console.log("Error fetching staff", error);
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching staff",
          description: "An error occured while fetching staff",
        });
      },
    }
  );
};

/**
 * @Mutation Update a staff member
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
        console.log("Error updating staff", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["staff"]);
        queryClient.invalidateQueries(["staffs"]);
        toast({
          title: "Staff updated successfully",
          description: "Staff has been updated successfully",
        });
        navigate("/admin/staff");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error updating staff",
          description: "An error occured while updating staff",
        });
      },
    }
  );
};

/**
 * @Mutation Create a new staff member
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
        console.log("Error creating staff", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["staffs"]);
        toast({
          title: "Staff created successfully",
          description: "Staff has been created successfully",
        });
        navigate("/admin/staff");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error creating staff",
          description: "An error occured while creating staff",
        });
      },
    }
  );
};
