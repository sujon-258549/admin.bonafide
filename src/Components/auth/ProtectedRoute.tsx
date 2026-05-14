import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../redux/hooks";

interface ProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute = ({ redirectTo = "/login" }: ProtectedRouteProps) => {
  const token = useAppSelector((s) => s.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
