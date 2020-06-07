import { post } from "./ajax";

export const join = async (credentials) => {
    return await post("join", credentials);
};