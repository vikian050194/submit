import { post } from "./ajax";

export const join = async (credentials) => {
    return await post("join", credentials);
};

export const leave = async (credentials) => {
    return await post("leave", credentials);
};