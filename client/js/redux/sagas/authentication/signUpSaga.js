import {
    createAction,
    SIGNUP_START,
    SIGNUP_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { signUp } from "./../../../api";

const onSuccess = (user) => createAction(SIGNUP_FINISH)(user);
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

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
    yield takeEvery(SIGNUP_START, doSignUp);
}