import {
  GET_INTERACTIONS,
  GET_INTERACTIONS_FAIL,
  GET_INTERACTIONS_SUCCESS,
  ADD_NEW_INTERACTION,
  ADD_INTERACTION_SUCCESS,
  ADD_INTERACTION_FAIL,
  UPDATE_INTERACTION,
  UPDATE_INTERACTION_SUCCESS,
  UPDATE_INTERACTION_FAIL,


} from "./actionTypes"

export const getInteractions = () => ({
  type: GET_INTERACTIONS,
})

export const getInteractionsSuccess = interactions => ({
  type: GET_INTERACTIONS_SUCCESS,
  payload: interactions,
})

export const getInteractionsFail = error => ({
  type: GET_INTERACTIONS_FAIL,
  payload: error,
})

export const addNewInteraction = interaction => ({
  type: ADD_NEW_INTERACTION,
  payload: interaction,
})

export const addInteractionSuccess = interaction => ({
  type: ADD_INTERACTION_SUCCESS,
  payload: interaction,
})

export const addInteractionFail = error => ({
  type: ADD_INTERACTION_FAIL,
  payload: error,
})

export const updateInteraction = user => ({
  type: UPDATE_INTERACTION,
  payload: user,
})

export const updateInteractionSuccess = user => ({
  type: UPDATE_INTERACTION_SUCCESS,
  payload: user,
})

export const updateInteractionFail = error => ({
  type: UPDATE_INTERACTION_FAIL,
  payload: error,
})
