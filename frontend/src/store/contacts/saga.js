import { call, put, takeEvery } from "redux-saga/effects"

import { GET_USERS,  ADD_NEW_USER } from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  addUserFail,
  addUserSuccess,
 
} from "./actions"

import { getUsers,  addNewUser,  } from "../../helpers/fakebackend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    console.log(response)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* onAddNewUser({ payload: user }) {

  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess(response))
  } catch (error) {

    yield put(addUserFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
 
}

export default contactsSaga;
