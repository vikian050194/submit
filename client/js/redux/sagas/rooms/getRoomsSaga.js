import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { getRooms } from "../../../api";

const onSuccess = (user) => actionCreator(types.ROOMS_GET_FINISH)(user);
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

function* doGetRooms() {
    try {
        const response = yield call(getRooms);
        yield put(onSuccess(response));
        yield put(push("/rooms"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* getRoomsSaga() {
    yield takeEvery(types.ROOMS_GET_START, doGetRooms);
}