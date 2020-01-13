import * as types from "../../actions/actionTypes";
import { takeEvery } from "redux-saga/effects";

function doSaveUser({ value: user }) {
    sessionStorage.setItem("user", JSON.stringify(user));
}

export function* saveUserSaga() {
    yield takeEvery(types.SIGNIN_FINISH, doSaveUser);
}