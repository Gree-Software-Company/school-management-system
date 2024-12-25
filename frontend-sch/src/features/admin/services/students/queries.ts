/**
 * @description Queries for Students service
 * @module StudentQueries
 */
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * @Query Fetch all students
 */
export const useFetchStudents = () => {
  const { toast } = useToast();
  return useQuery(
    ["students"],
    async () => {
      try {
        const response = await apiClient.get("/students");
        return response.data?.students;
      } catch (error) {
        console.log("Error fetching students", error);
      }
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

/**
 * @Query Fetch a single student by ID
 */
export const useFetchAStudent = (studentId: string) => {
  const { toast } = useToast();
  return useQuery(
    ["student", studentId],
    async () => {
      try {
        const response = await apiClient.get(`/students/${studentId}`);
        return response.data?.student;
      } catch (error) {
        console.log("Error fetching student", error);
      }
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

/**
 * @Mutation Create a new student
 */
export const useCreateStudent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (data: CreateStudentForm) => {
      try {
        const response = await apiClient.post("/students", data);
        return response.data?.student;
      } catch (error) {
        console.log("Error creating student", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
        toast({
          title: "Student created",
          description: "The student was created successfully.",
        });
        navigate("/admin/students");
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

/**
 * @Mutation Update a student
 */
export const useUpdateStudent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    async (data: UpdateStudentForm) => {
      try {
        const response = await apiClient.put(`/students/${data.id}`, data);
        return response.data?.student;
      } catch (error) {
        console.log("Error updating student", error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
        toast({
          title: "Student updated",
          description: "The student was updated successfully.",
        });
        navigate("/admin/students");
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error updating student",
          description: "An error occured while updating the student.",
        });
      },
    }
  );
};
