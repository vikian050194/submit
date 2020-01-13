import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";

const onSuccess = (user) => actionCreator(types.SIGNIN_FINISH)(user);

function* doLoadUser() {
    const user = yield call(sessionStorage.getItem, "user");

    if (user) {
        yield put(onSuccess(JSON.parse(user)));
        yield put(push("/menu"));
    }
}

export function* loadUserSaga() {
    yield takeEvery(types.APP_INIT, doLoadUser);
}