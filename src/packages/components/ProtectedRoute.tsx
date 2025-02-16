import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
  isAuthenticated: boolean; // Kiểm tra người dùng đã đăng nhập hay chưa
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? <>{element}</> : <Navigate to="/" replace />;
};
