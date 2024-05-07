import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";

const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};



const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);

export const getUsers = () => get(url.GET_USERS);

export const addNewUser = user => post(url.ADD_NEW_USER, user);

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeLogin,

};
