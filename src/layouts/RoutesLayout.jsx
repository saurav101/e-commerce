import { useAuthUser } from "../providers/AuthProvider";
import { Navigate, Outlet } from "react-router";

export function GuestRoutes() {
  const { authUser } = useAuthUser();
  if (authUser) return <Navigate to="/" />;
  return <Outlet />;
}
export function ProtectedRoutes() {
  const { authUser } = useAuthUser();
  if (!authUser) return <Navigate to="/sign-in" />;
  return <Outlet />;
}
export function AdminRoutes() {
  const { authUser } = useAuthUser();
  if (authUser.roles.includes("Admin")) return <Outlet />;
  return <Navigate to="/" />;
}
