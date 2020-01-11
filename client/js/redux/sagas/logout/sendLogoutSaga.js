import actionCreator from "../../actions/actionCreator";
import * as types from "../../actions/actionTypes";
import { push } from "connected-react-router";
import { take, put, call } from "redux-saga/effects";

const onSuccess = (user) => actionCreator(types.LOGOUT_FINISH)(user);
const onFail = (error) => actionCreator(types.LOGOUT_FAIL)(error);

const doLogout = (api, name) => {
    return new Promise((resolve, reject) => {
        api.logout({ name }, (status, response) => {
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

export const sendLogoutSaga = (api) => {
    return function* logout() {
        const { value: name } = yield take(types.LOGOUT_START);
        const { response, error } = yield call(doLogout, api, name);

        if (response) {
            yield put(onSuccess(response));
            yield put(push("/"));
        }
        else {
            yield put(onFail(error));
        }
    };
};