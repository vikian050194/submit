import ajax from "./ajax";

export const getRooms = async () => {
    return await ajax.get("rooms");
};
