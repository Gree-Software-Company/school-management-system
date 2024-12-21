import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./auth";
import { useToast } from "@/hooks/use-toast";

// Mutation to login
export const useLogin = () => {
  const { toast } = useToast();
  return useMutation(
    (data: { email: string; password: string }) =>
      loginApi(data.email, data.password),
    {
      onSuccess: () => {
        toast({
          title: "Login successful",
          description: "You have successfully logged in",
        });
      },
      onError: (error: Errors) => {
        console.log(error);
        toast({
          title: error.data.type,
          description: error.data.message,
        });
      },
    }
  );
};
