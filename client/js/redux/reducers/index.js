import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./authenticationReducer";
import users from "./usersReducer";
import messages from "./messagesReducer";
import arena from "./arenaReducer";
import rooms from "./roomsReducer";

const createRootReducer  = (history) => combineReducers({
    router: connectRouter(history),
    user,
    users,
    rooms,
    messages,
    arena
});

export default createRootReducer;