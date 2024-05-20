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

export const updateUser = user => put(url.UPDATE_USER, user);

export const deleteUser = user => del(url.DELETE_USER, { headers: { user } });

export const getSales = () => get(url.GET_SALES);

export const addNewSale = sale => post(url.ADD_NEW_SALE, sale);

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeLogin,

};
