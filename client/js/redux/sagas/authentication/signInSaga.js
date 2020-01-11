import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { signIn } from "./../../../api";

const onSuccess = (user) => actionCreator(types.SIGNIN_FINISH)(user);
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

function* doSignIn({ value: credentials }) {
    try {
        const response = yield call(signIn, credentials);
        yield put(onSuccess(response));
        yield put(push("/menu"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* signInSaga() {
    yield takeEvery(types.SIGNIN_START, doSignIn);
}