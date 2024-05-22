import { call, put, takeEvery } from "redux-saga/effects"
import { GET_SALES,  ADD_NEW_SALE, UPDATE_SALE } from "./actionTypes"


import {
  getSalesSuccess,
  getSalesFail,
  addSaleFail,
  addSaleSuccess,
  updateSaleSuccess,
  updateSaleFail
} from "./actions"

import { getSales,  addNewSale, updateSale} from "../../helpers/fakebackend_helper"

function* fetchSales() {
  try {
    const response = yield call(getSales)
    yield put(getSalesSuccess(response))
  } catch (error) {
    yield put(getSalesFail(error))
  }
}

function* onAddNewSale({ payload: sale }) {
  console.log(sale);
  try {
    const response = yield call(addNewSale, sale)
    console.log(response);
    yield put(addSaleSuccess(response))
  } catch (error) {
    console.log("Este es el error", error);
    yield put(addSaleFail(error))
  }
}

function* onUpdateSale({ payload: sale }) {
  try {
    const response = yield call(updateSale, sale)
    yield put(updateSaleSuccess(response))
  } catch (error) {
    yield put(updateSaleFail(error))
  }
}

function* saleshistorySaga() {
  yield takeEvery(GET_SALES, fetchSales)
  yield takeEvery(ADD_NEW_SALE, onAddNewSale)
  yield takeEvery(UPDATE_SALE, onUpdateSale)


}

export default saleshistorySaga;
