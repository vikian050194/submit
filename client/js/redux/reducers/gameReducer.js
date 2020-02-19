import * as types from "../actions/actionTypes";

const defaultState = {
    id: null
};

export default function Reducer(state = defaultState, action) {
    switch (action.type) {
        case types.GAME_JOIN_FINISH:
            return { ...state, id: action.value };
        case types.GAME_QUIT_FINISH:
            return { ...defaultState, id: null };
        case types.ACTION_RECEIVE:
            return action.value;
        default:
            return state;
    }
}