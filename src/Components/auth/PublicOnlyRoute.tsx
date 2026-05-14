import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../redux/hooks";

const PublicOnlyRoute = () => {
  const token = useAppSelector((s) => s.auth.token);
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from
    ?.pathname;

  if (token) {
    return <Navigate to={from ?? "/"} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
