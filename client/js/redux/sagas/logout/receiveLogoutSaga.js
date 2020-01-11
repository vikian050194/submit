import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { eventChannel } from "redux-saga";
import { take, put, call } from "redux-saga/effects";

const onReceive = (user) => actionCreator(types.USER_LOGOUT)(user);
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

const waitNewUser = (api) => {
    return eventChannel(emitter => {
        api.subscribeToLogout(user => {
            emitter(user);
        });

        return () => {
            //unsubscribe function
        };
    });
};
//probably there is another (better) way to do it
//separate entity that dispatch actions to store from callbacks
export const receiveLogoutSaga = (api) => {
    return function* receiveLogout() {
        const chan = yield call(waitNewUser, api);

        try {
            while (true) {
                let user = yield take(chan);
                yield put(onReceive(user));
            }
        } catch (e) {
            yield put(onFail(e));
        }
    };
};