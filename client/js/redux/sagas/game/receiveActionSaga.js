import createAction from "../../actions/createAction";
import * as types from "../../actions/actionTypes";
import { eventChannel } from "redux-saga";
import { take, put, call } from "redux-saga/effects";

const onReceive = (arena) => createAction(types.ACTION_RECEIVE)(arena);
const onFail = (error) => createAction(types.NOTIFICATION_ERROR)(error);

const waitNewAction = (api) => {
    return eventChannel(emitter => {
        api.subscribeToAction(arena => {
            emitter(arena);
        });

        return () => {
            //unsubscribe function
        };
    });
};
//probably there is another (better) way to do it
//separate entity that dispatch actions to store from callbacks
export const receiveActionSaga = (api) => {
    return function* receiveAction() {
        const chan = yield call(waitNewAction, api);

        try {
            while (true) {
                let arena = yield take(chan);
                yield put(onReceive(arena));
            }
        } catch (e) {
            yield put(onFail(e));
        }
    };
};