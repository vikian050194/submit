import ajax from "./ajax";

export const join = async (credentials) => {
    return await ajax.post("join", credentials);
};

export const quit = async (data) => {
    return await ajax.post("quit", data);
};
