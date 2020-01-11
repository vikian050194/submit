import * as types from "../actions/actionTypes";

const defaultState = [];

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.USER_LOGIN:
            return [...state, action.value];
        case types.USER_LOGOUT:
            return state.filter(u => u.id !== action.value.id);
        default:
            return state;
    }
}