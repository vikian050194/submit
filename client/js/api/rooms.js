import ajax from "./ajax";

export const getRooms = async () => {
    return await ajax.get("rooms");
};

export const joinRoom = async (roomId) => {
    return await ajax.post(`rooms/${roomId}/join`);
};
