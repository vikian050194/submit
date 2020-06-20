import * as types from "../actions/actionTypes";
import { takeEvery } from "redux-saga/effects";

export function* notificationSaga() {
    yield takeEvery(types.NOTIFICATION_LOG, ({value}) => {
        console.log(value);
    });

    yield takeEvery(types.NOTIFICATION_INFO, ({value}) => {
        console.info(value);
    });

    yield takeEvery(types.NOTIFICATION_WARNING, ({value}) => {
        console.warn(value);
    });

    yield takeEvery(types.NOTIFICATION_ERROR, ({value}) => {
        console.error(value);
    });
}