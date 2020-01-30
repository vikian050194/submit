import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./userReducer";
// import users from "./usersReducer";
import rooms from "./roomsReducer";
import messages from "./messagesReducer";
import arena from "./arenaReducer";

const createRootReducer  = (history) => combineReducers({
    router: connectRouter(history),
    user,
    // users,
    rooms,
    messages,
    arena
});

export default createRootReducer;