import { call, put, takeEvery } from "redux-saga/effects"
import { GET_INTERACTIONS,  ADD_NEW_INTERACTION } from "./actionTypes"


import {
  getInteractionsSuccess,
  getInteractionsFail,
  addInteractionFail,
  addInteractionSuccess,

} from "./actions"

import { getInteractions,  addNewInteraction} from "../../helpers/fakebackend_helper"

function* fetchInteractions() {
  try {
    const response = yield call(getInteractions)
    yield put(getInteractionsSuccess(response))
  } catch (error) {
    yield put(getInteractionsFail(error))
  }
}

function* onAddNewInteraction({ payload: interaction }) {
  try {
    const response = yield call(addNewInteraction, interaction)
    console.log(response);
    yield put(addInteractionSuccess(response))
  } catch (error) {
    console.log("Este es el error", error);
    yield put(addInteractionFail(error))
  }
}



function* InteractionsSaga() {
  yield takeEvery(GET_INTERACTIONS, fetchInteractions)
  yield takeEvery(ADD_NEW_INTERACTION, onAddNewInteraction)


}

export default InteractionsSaga;
