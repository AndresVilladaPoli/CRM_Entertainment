import {
  GET_INTERACTIONS_SUCCESS,
  GET_INTERACTIONS_FAIL,
  ADD_INTERACTION_SUCCESS,
  ADD_INTERACTION_FAIL,

  
} from "./actionTypes";

const INIT_STATE = {
  interactions: [],
  error: {},
};

const interactionsh = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INTERACTIONS_SUCCESS:
      return {
        ...state,
        interactions: action.payload,
        error: {},
      };

    case GET_INTERACTIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_INTERACTION_SUCCESS:
      return {
        ...state,
        interactions: [...state.interactions, action.payload],
        error: {},
      };

    case ADD_INTERACTION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      

    default:
      return state;
  }
};

export default interactionsh;