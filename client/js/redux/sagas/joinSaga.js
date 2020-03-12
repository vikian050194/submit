import createAction from "../actions/createAction";
import * as types from "../actions/actionTypes";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { join } from "../../api";

const onSuccess = (user) => createAction(types.JOIN_FINISH)(user);
const onFail = (error) => createAction(types.NOTIFICATION_ERROR)(error);

function* doJoin({ value: credentials }) {
    try {
        const response = yield call(join, credentials);
        yield put(onSuccess(response));
        yield put(push("/game"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* joinSaga() {
    yield takeEvery(types.JOIN_START, doJoin);
}