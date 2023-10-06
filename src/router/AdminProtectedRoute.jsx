import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const currentUser = useAuth();

  return currentUser ? (
    currentUser.permissions < 2 ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminProtectedRoute;
