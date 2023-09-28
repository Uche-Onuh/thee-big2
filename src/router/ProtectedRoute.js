import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Login } from "../scenes";

const ProtectedRoute = ({ children }) => {
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return currentUser ? children : null;
};

export default ProtectedRoute;
