import {
  GET_SALES_SUCCESS,
  GET_SALES_FAIL,
  ADD_SALE_SUCCESS,
  ADD_SALE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  sales: [],
  error: {},
};

const saleshistory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SALES_SUCCESS:
      return {
        ...state,
        sales: action.payload,
        error: {},
      };

    case GET_SALES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_SALE_SUCCESS:
      return {
        ...state,
        sales: [...state.sales, action.payload],
        error: {},
      };

    case ADD_SALE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default saleshistory;