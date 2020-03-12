import { get } from "./ajax";

export const getState = async () => {
    return await get("game");
};