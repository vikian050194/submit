import * as types from "../actions/actionTypes";

const defaultState = {
    size: 0,
    walls: [],
    blocks: [],
    users: [],
    capacity: 0
};

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_STATE_FINISH:
            return action.value;
        default:
            return state;
    }
}