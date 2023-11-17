import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const token = Cookies.get("jwt_token");

  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoutes;
