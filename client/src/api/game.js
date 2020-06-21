import { get, post } from "./ajax";

export const getState = async () => {
    return await get("state");
};

export const submit = async (data) => {
    return await post("submit", data);
};