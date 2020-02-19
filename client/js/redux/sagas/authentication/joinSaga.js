import {
    createAction,
    JOIN_START,
    JOIN_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { join } from "../../../api";

const onSuccess = (user) => createAction(JOIN_FINISH)(user);
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

function* doJoin({ value: credentials }) {
    try {
        const response = yield call(join, credentials);
        yield put(onSuccess(response));
        yield put(push("/menu"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* joinSaga() {
    yield takeEvery(JOIN_START, doJoin);
}