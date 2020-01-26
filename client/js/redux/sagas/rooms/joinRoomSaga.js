import {
    createAction,
    ROOM_JOIN_START,
    ROOM_JOIN_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { joinRoom } from "../../../api";

const onSuccess = (user) => createAction(ROOM_JOIN_FINISH)(user);
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

function* doJoinRoom({ value: roomId }) {
    try {
        const response = yield call(joinRoom, roomId);
        yield put(onSuccess(response));
        yield put(push(`/rooms/${roomId}`));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* joinRoomSaga() {
    yield takeEvery(ROOM_JOIN_START, doJoinRoom);
}