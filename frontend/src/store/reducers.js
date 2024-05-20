import { combineReducers } from "redux";

import Layout from "./layout/reducer";

import Login from "./auth/login/reducer";
import Register from "./auth/register/reducer";

import contacts from "./contacts/reducer";

import Dashboard from "./dashboard/reducer";
import saleshistory from "./saleshistory/reducer";



const rootReducer = combineReducers({
  Layout,
  Login,
  Register,

  contacts,
  saleshistory,
  Dashboard,
 
});

export default rootReducer;
