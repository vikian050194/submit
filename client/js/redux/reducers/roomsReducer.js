import * as types from "../actions/actionTypes";

const defaultState = [];

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.ROOMS_GET_FINISH:
            return action.value;
        default:
            return state;
    }
}