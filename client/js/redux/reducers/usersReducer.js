// import {
//     USER_LOGIN,
//     USER_LOGOUT
// } from "../actions";

// const defaultState = [];

// export default function Reducer(state = defaultState, action) {
//     switch (action.type) {
//         case USER_LOGIN:
//             return [...state, action.value];
//         case USER_LOGOUT:
//             return state.filter(u => u.id !== action.value.id);
//         default:
//             return state;
//     }
// }