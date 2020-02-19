import {
    createAction,
    QUIT_START,
    QUIT_FINISH,
    NOTIFICATION_ERROR
} from "../../actions";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { quit } from "../../../api";

const onSuccess = () => createAction(QUIT_FINISH)();
const onFail = (error) => createAction(NOTIFICATION_ERROR)(error);

function* doQuit({ value: id }) {
    try {
        const response = yield call(quit, { id });
        yield put(onSuccess(response));
        yield put(push("/"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* quitSaga() {
    yield takeEvery(QUIT_START, doQuit);
}