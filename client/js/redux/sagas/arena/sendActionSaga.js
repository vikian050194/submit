import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { take, put, call } from "redux-saga/effects";

const onSuccess = (arena) => actionCreator(types.ACTION_RECEIVE)(arena);
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

const doAction = (api, action) => {
    return new Promise((resolve, reject) => {
        api.sendAction(action, (status, response) => {
            if (status === "OK") {
                resolve(response);
            }
            else {
                reject(response);
            }
        });
    })
        .then(response => ({ response }))
        .catch(error => ({ error }));
};

export const sendActionSaga = (api) => {
    return function* action() {
        const { value: action } = yield take(types.ACTION_SEND);
        const { response, error } = yield call(doAction, api, action);

        if (response) {
            yield put(onSuccess(response));
        }
        else {
            yield put(onFail(error));
        }
    };
};