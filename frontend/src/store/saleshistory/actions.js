import {
  GET_SALES,
  GET_SALES_FAIL,
  GET_SALES_SUCCESS,
  ADD_NEW_SALE,
  ADD_SALE_SUCCESS,
  ADD_SALE_FAIL,

} from "./actionTypes"

export const getSales = () => ({
  type: GET_SALES,
})

export const getSalesSuccess = sales => ({
  type: GET_SALES_SUCCESS,
  payload: sales,
})

export const getSalesFail = error => ({
  type: GET_SALES_FAIL,
  payload: error,
})

export const addNewSale = sale => ({
  type: ADD_NEW_SALE,
  payload: sale,
})

export const addSaleSuccess = sale => ({
  type: ADD_SALE_SUCCESS,
  payload: sale,
})

export const addSaleFail = error => ({
  type: ADD_SALE_FAIL,
  payload: error,
})
