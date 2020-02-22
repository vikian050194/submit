import ajax from "./ajax";

export const join = async () => {
    return await ajax.post("join");
};