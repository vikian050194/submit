// import io from "socket.io-client";
import ajax from "./ajax";

// const client = io();

// const MESSAGE = "MESSAGE";
// const ACTION = "ACTION";

// export const sendMessage = (payload, cb) => {
//     client.emit(MESSAGE, payload, cb);
// };

// export const subscribeToMessage = (cb) => {
//     client.on(MESSAGE, cb);
// }
// ;
// export const sendAction = (payload, cb) => {
//     client.emit(ACTION, payload, cb);
// };

// export const subscribeToAction = (cb) => {
//     client.on(ACTION, cb);
// };

export const getRooms = async () => {
    return await ajax.get("games");
};

export const joinGame = async (roomId) => {
    return await ajax.post(`games/${roomId}/join`);
};