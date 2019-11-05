import io from "socket.io-client";

const socket = io();

const sendToChat = (payload) => {
    socket.emit("message", payload);
};

export const subscribeToChat = (callback) => {
    socket.on("message", callback);

    return sendToChat;
};

const login = (payload) => {
    socket.emit("login", payload);
};

export const subscribeToLogin = (callback) => {
    socket.on("login", callback);

    return login;
};

const logout = (payload) => {
    socket.emit("logout", payload);
};

export const subscribeToLogout = (callback) => {
    socket.on("logout", callback);

    return logout;
};