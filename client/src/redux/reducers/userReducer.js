import * as types from "../actions/actionTypes";

const defaultState = {
    id: null,
    type: "guest"
};

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.JOIN_FINISH:
            return { ...action.value, type: "player" };
        case types.LEAVE_FINISH:
            return defaultState;
        default:
            return state;
    }
}