import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { signUp } from "./../../../api";

const onSuccess = (user) => actionCreator(types.SIGNUP_FINISH)(user);
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

function* doSignUp({ value: credentials }) {
    try {
        const response = yield call(signUp, credentials);
        yield put(onSuccess(response));
        yield put(push("/menu"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* signUpSaga() {
    yield takeEvery(types.SIGNUP_START, doSignUp);
}