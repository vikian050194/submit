import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import error from "./errorReducer";
import user from "./authenticationReducer";
import users from "./usersReducer";
import chat from "./chatReducer";
import arena from "./arenaReducer";

const createRootReducer  = (history) => combineReducers({
    router: connectRouter(history),
    user,
    users,
    messages: chat,
    arena,
    errors: error
});

export default createRootReducer;