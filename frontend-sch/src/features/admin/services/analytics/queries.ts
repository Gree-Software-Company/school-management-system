/**
 * @description Queries for analytics service
 * @module AnalyticsQueries
 */
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useAuthStore } from "@/store/auth-store";
import { QueryClient, useQuery } from "@tanstack/react-query";

/**
 * @Query Fetch general analytics
 */
export const useFetchGeneralAnalytics = () => {
  const { toast } = useToast();
  const { token } = useAuthStore();

  return useQuery(
    ["analytics"],
    async () => {
      if (!token) {
        throw new Error("No token provided");
      }

      try {
        const response = await apiClient.get("/analytics");
        return response.data?.analytics;
      } catch (error) {
        console.log("Error fetching analytics", error);
        throw error;
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching analytics",
          description: "An error occurred while fetching analytics.",
        });
      },
    }
  );
};

/**
 * @function invalidateAnalytics
 */
const queryClient = new QueryClient();

export const invalidateAnalytics = () => {
  queryClient.invalidateQueries(["analytics"]);
};
