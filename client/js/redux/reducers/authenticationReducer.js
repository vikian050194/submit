import * as types from "../actions/actionTypes";

const defaultState = { id: null, name: null };

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.SIGNUP_FINISH:
        case types.SIGNIN_FINISH:
            return action.value;
        case types.SIGNOUT_FINISH:
            return defaultState;
        default:
            return state;
    }
}