import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";
import { interactionSettingsStore } from "@fullcalendar/core";

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

export const updateSale = sale => put(url.UPDATE_SALE, sale);

export const getInteractions = () => get(url.GET_INTERACTIONS);

export const addNewInteraction = interaction => post(url.ADD_NEW_INTERACTION, interaction);

export const updateInteraction = interaction => put(url.UPDATE_INTERACTION, interaction);

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeLogin,

};
