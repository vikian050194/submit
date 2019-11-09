import io from "socket.io-client";

const client = io();

export const message = (payload, cb) => {
    client.emit("message", payload, cb);
};

export const subscribeToMessage = (cb) => {
    client.on("message", cb);
};

export const login = (payload, cb) => {
    client.emit("login", payload, cb);
};

export const subscribeToLogin = (cb) => {
    client.on("login", cb);
};

export const logout = () => {
    client.emit("logout");
};

export const subscribeToLogout = (cb) => {
    client.on("logout", cb);
};

export const action = (payload, cb) => {
    client.emit("action", payload, cb);
};

export const subscribeToAction = (cb) => {
    client.on("action", cb);
};