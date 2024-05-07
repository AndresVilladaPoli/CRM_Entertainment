import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};



const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);



export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeLogin,

};
