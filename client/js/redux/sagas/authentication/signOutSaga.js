import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { push } from "connected-react-router";
import { takeEvery, put, call } from "redux-saga/effects";
import { signOut } from "./../../../api";

const onSuccess = () => actionCreator(types.SIGNOUT_FINISH)();
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

function* doSignOut({ value: id }) {
    try {
        const response = yield call(signOut, {id});
        yield put(onSuccess(response));
        yield put(push("/"));
    }
    catch (error) {
        yield put(onFail(error.message));
    }
}

export function* signOutSaga() {
    yield takeEvery(types.SIGNOUT_START, doSignOut);
}