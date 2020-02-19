import * as types from "../actions/actionTypes";

const defaultState = { id: null, name: null };

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.QUIT_START:
            return action.value;
        case types.QUIT_FINISH:
            return defaultState;
        default:
            return state;
    }
}