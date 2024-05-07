import { combineReducers } from "redux";

import Layout from "./layout/reducer";

import Login from "./auth/login/reducer";
import Register from "./auth/register/reducer";

import Dashboard from "./dashboard/reducer";



const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Register,

  Dashboard,
 
});

export default rootReducer;
