import { apiClient } from "../axios-instance";

export const loginApi = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};
