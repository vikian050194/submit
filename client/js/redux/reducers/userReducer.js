import * as types from "../actions/actionTypes";

const defaultState = {
    id: null,
    score: 0,
    state: null
};

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.JOIN_FINISH:
            return action.value;
        default:
            return state;
    }
}