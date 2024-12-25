/**
 * @description Queries for Staff service
 * @module StaffQueries
 */

import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useQuery } from "@tanstack/react-query";

/**
 * @Query Fetch all teaching staff
 */
export const useFetchTeachers = () => {
  const { toast } = useToast();
  return useQuery(
    ["staff-teachers"],
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
