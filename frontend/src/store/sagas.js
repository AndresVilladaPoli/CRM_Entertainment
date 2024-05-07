import { all, fork } from "redux-saga/effects";

import AuthSaga from "./auth/login/saga";
import LayoutSaga from "./layout/saga";
import contactsSaga from "./contacts/saga";

import dashboardSaga from "./dashboard/saga";


export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(contactsSaga),

    fork(dashboardSaga),
   
  ]);
}
