import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser ) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default ProtectedRoute;
