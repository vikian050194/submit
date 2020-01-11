import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { take, put, call } from "redux-saga/effects";

const onSuccess = (message) => actionCreator(types.MESSAGE_RECEIVE)(message);
const onFail = (error) => actionCreator(types.NOTIFICATION_ERROR)(error);

const doSend = (api, message) => {
    return new Promise((resolve, reject) => {
        api.sendMessage({ message }, (status, response) => {
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

export const sendMessageSaga = (api) => {
    return function* sendMessage() {
        const { value: message } = yield take(types.MESSAGE_SEND);
        const { response, error } = yield call(doSend, api, message);

        if (response) {
            yield put(onSuccess(response));
        }
        else {
            yield put(onFail(error));
        }
    };
};