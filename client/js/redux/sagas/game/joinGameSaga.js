import {
    createAction,
    GAME_JOIN_START,
    GAME_JOIN_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { joinGame } from "../../../api";

const onSuccess = (game) => createAction(GAME_JOIN_FINISH)(game);
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

function* doJoinGame({ value: gameId }) {
    try {
        const response = yield call(joinGame, gameId);
        yield put(onSuccess(response));
        yield put(push(`/games/${gameId}`));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* joinGameSaga() {
    yield takeEvery(GAME_JOIN_START, doJoinGame);
}