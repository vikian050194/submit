import createAction from "../actions/createAction";
import * as types from "../actions/actionTypes";
import { takeEvery, put, call } from "redux-saga/effects";
import { submit } from "../../api";

const onSuccess = () => createAction(types.SUBMIT_FINISH)();
const onFail = (error) => createAction(types.NOTIFICATION_ERROR)(error);

function* doSubmit({ value: data }) {
    try {
        yield call(submit, data);
        yield put(onSuccess());
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* submitSaga() {
    yield takeEvery(types.SUBMIT_START, doSubmit);
}