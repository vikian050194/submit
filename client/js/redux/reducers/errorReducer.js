import * as types from "../actions/actionTypes";

const defaultState = [];

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.NOTIFICATION_ERROR:
            return [...state, { type: action.type, message: action.value }];
        case types.ERROR_DELETE:
            return state.filter(e => e.type !== action.value);
        default:
            return state;
    }
}