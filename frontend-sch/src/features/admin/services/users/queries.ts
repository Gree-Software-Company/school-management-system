/**
 * @description Queries for Users service
 * @module UsersQueries
 */

import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/services/axios-instance";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchUserEmail = () => {
  const { toast } = useToast();
  const { token } = useAuthStore();
  return useQuery(
    ["user-email"],
    async () => {
      try {
        const response = await apiClient.get(`/auth/me?token=${token}`);
        return response.data?.data?.email;
      } catch (error) {
        console.log("Error fetching user", error);
      }
    },
    {
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error fetching user",
          description: "An error occured while fetching user.",
        });
      },
    }
  );
};

export const useUpdateEmail = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { token, login, user } = useAuthStore();
  return useMutation(
    async (data: UpdateUserEmail) => {
      try {
        const response = await apiClient.put(`/auth/me?token=${token}`, data);
        return response.data;
      } catch (error) {
        console.log("Error updating user email", error);
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["user-email"]);
        if (user) {
          const updatedUser = {
            ...user,
            email: data?.data.email,
            name: data?.data.name,
          };
          login(updatedUser.email, updatedUser.name, token as string);
        }
        toast({
          title: "Email Updated",
          description: "The email was updated successfully.",
        });
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error updating email",
          description: "An error occured while updating email.",
        });
      },
    }
  );
};
