import { combineReducers } from "redux";

import Layout from "./layout/reducer";

import Login from "./auth/login/reducer";

import contacts from "./contacts/reducer";

import Dashboard from "./dashboard/reducer";



const rootReducer = combineReducers({
  Layout,
  Login,
  contacts,
  Dashboard,
 
});

export default rootReducer;
