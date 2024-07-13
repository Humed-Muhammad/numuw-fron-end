import type { LoginResponse } from "@/page/types";
import { getLocalData } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = getLocalData<LoginResponse>("user");
  const location = useLocation();

  if (!user?.token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
