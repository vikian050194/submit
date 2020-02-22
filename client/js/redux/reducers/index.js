import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import error from "./errorReducer";
import user from "./userReducer";
import game from "./gameReducer";
const createRootReducer  = (history) => combineReducers({
    router: connectRouter(history),
    user,
    game,
    errors: error
});

export default createRootReducer;