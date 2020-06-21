import createAction from "../actions/createAction";
import * as types from "../actions/actionTypes";
import { takeEvery, put, call } from "redux-saga/effects";
import { leave } from "../../api";

const onSuccess = (user) => createAction(types.LEAVE_FINISH)(user);
const onFail = (error) => createAction(types.NOTIFICATION_ERROR)(error);

function* doLeave({ value: credentials }) {
    try {
        const response = yield call(leave, credentials);
        yield put(onSuccess(response));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* leaveSaga() {
    yield takeEvery(types.LEAVE_START, doLeave);
}