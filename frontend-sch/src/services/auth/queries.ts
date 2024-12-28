import { useMutation } from "@tanstack/react-query";
import { loginApi } from "./auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

// Mutation to login
export const useLogin = () => {
  const { toast } = useToast();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  return useMutation(
    (data: { email: string; password: string }) =>
      loginApi(data.email, data.password),
    {
      onSuccess: (data) => {
        const { email, name, token } = data.data;
        login(email, name, token);
        toast({
          title: "Login successful",
          description: "You have successfully logged in",
        });
        navigate("/admin");
      },
      onError: (error: Errors) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.response.data.message || error.response.data.error,
        });
      },
    }
  );
};
