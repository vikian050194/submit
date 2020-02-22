import * as types from "../actions/actionTypes";

const defaultState = {
    size: 0,
    capacity: 0,
    users: []
};

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.ACTION_RECEIVE:
            return action.value;
        default:
            return state;
    }
}