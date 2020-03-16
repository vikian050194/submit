import createAction from "../actions/createAction";
import * as types from "../actions/actionTypes";
import { eventChannel } from "redux-saga";
import { take, put, call, select } from "redux-saga/effects";
import ControllerManager from "./../../controller/manager";

const onJoin = () => createAction(types.JOIN_START)();
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

export const inputSaga = function* receiveLogout() {
    const chan = yield call(waitNewInput);

    try {
        while (true) {
            let input = yield take(chan);
            let user = yield select(getUser);

            if(input.actions.length !== 0 && user.isPlayer === false){
                yield put(onJoin());
            }
        }
    } catch (e) {
        yield put(onFail(e));
    }
};