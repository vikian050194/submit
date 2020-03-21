import createAction from "../actions/createAction";
import * as types from "../actions/actionTypes";
import { eventChannel } from "redux-saga";
import { takeEvery, put, call, select } from "redux-saga/effects";
import ControllerManager from "./../../controller/manager";

const onJoin = (credentials) => createAction(types.JOIN_START)(credentials);
const onFail = (error) => createAction(types.NOTIFICATION_ERROR)(error);

const waitNewInput = () => {
    return eventChannel(emitter => {
        new ControllerManager(emitter);

        return () => {
            //unsubscribe function
        };
    });
};

const getUser = (state) => state.user;

function* onInput (input) {
    let user = yield select(getUser);
    
    if (input.actions.length === 1 && input.actions[0] === "start") {//&& user.id === null 
        yield put(onJoin(user));
    }
}

export const inputSaga = function* receiveLogout() {
    const chanel = yield call(waitNewInput);

    yield takeEvery(chanel, onInput);
};