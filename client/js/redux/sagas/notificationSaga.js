import * as types from "../actions/actionTypes";
import { takeEvery } from "redux-saga/effects";

export function* notificationSaga() {
    yield takeEvery(types.NOTIFICATION_INFO, ({value}) => {
        alert(value);
        // console.info(value);
    });

    yield takeEvery(types.NOTIFICATION_ERROR, () => {
        alert("Something went wrong.", "Please retry or reload the page.");
        // console.error(value);
    });
}