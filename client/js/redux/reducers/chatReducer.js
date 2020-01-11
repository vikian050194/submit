import * as types from "../actions/actionTypes";

const defaultState = [];

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.MESSAGE_RECEIVE:
            return [...state, action.value];
        default:
            return state;
    }
}