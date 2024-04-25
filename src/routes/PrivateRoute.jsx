// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserSelector } from "../redux/selectors";
import { toast } from "react-toastify";

export const PrivateRoute = ({ children, roles }) => {
  const userSelector = useSelector(getUserSelector);

  if (!userSelector || userSelector.role === "") {
    console.log("Private route redirect");
    console.log("userRef", userRef);
    toast.error("Please login!");
    return <Navigate to="/" />;
  }

  // Kiểm tra xem người dùng có vai trò phù hợp không
  if (roles.includes(userSelector.role)) {
    console.log("Private route redirect");
    return <Navigate to="/permission-denied" />;
  }

  return <>{children}</>;
};
