import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  console.log(currentUser);

  return currentUser ? children : null;
};

export default ProtectedRoute;