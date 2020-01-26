import {
    createAction,
    SIGNIN_START,
    SIGNIN_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { signIn } from "./../../../api";

const onSuccess = (user) => createAction(SIGNIN_FINISH)(user);
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

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
    yield takeEvery(SIGNIN_START, doSignIn);
}