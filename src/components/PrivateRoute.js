import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user.currentUser);

  return user ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
