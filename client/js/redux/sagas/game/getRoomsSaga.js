import {
    createAction,
    ROOMS_GET_START,
    ROOMS_GET_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { getRooms } from "../../../api";

const onSuccess = (user) => createAction(ROOMS_GET_FINISH)(user);
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

function* doGetRooms() {
    try {
        const response = yield call(getRooms);
        yield put(onSuccess(response));
        yield put(push("/games"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* getRoomsSaga() {
    yield takeEvery(ROOMS_GET_START, doGetRooms);
}