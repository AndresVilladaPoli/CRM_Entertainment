import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";


import Dashboard from "../pages/Dashboard/index";


const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  {
    path: "/",
    exact: true,
    component: < Navigate to="/dashboard" />,
  },
];
const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },


];
export { authProtectedRoutes, publicRoutes };
