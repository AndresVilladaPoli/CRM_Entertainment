import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

import Dashboard from "../pages/Dashboard/index";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import SalesHistory from "../pages/SalesHistory/salesHistory";
import SalesOpportunity from "../pages/SalesOpportunity/salesOpportunity";


const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  {
    path: "/",
    exact: true,
    component: < Navigate to="/dashboard" />,
  },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/sales-history", component: <SalesHistory /> },
  { path: "/sales-opportunity", component: <SalesOpportunity /> },
];
const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },

];
export { authProtectedRoutes, publicRoutes };
