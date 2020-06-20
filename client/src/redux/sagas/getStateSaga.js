import createAction from "../actions/createAction";
import * as types from "../actions/actionTypes";
import { takeEvery, put, call } from "redux-saga/effects";
import { getState } from "../../api";

const onSuccess = (state) => createAction(types.GET_STATE_FINISH)(state);
const onFail = (error) => createAction(types.NOTIFICATION_ERROR)(error);

function* doGetState() {
    try {
        const response = yield call(getState);
        yield put(onSuccess(response));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* getStateSaga() {
    yield takeEvery(types.GET_STATE_START, doGetState);
}