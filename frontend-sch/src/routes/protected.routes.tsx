import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

export const ProtectedRoute = () => {
  const { user, token, isAuthenticated } = useAuthStore();

  if (!user || !token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
