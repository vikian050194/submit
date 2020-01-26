const Room = require("./Room");

module.exports = class RoomManager {
    constructor(){
        this.rooms = {};

        const defaultRoom = new Room("rgh89", "Default");
        this.rooms[defaultRoom.id] = defaultRoom;
    }
    
    addRoom(){
        this.rooms.set(name, new Room());
    }

    deleteRoom(id){
        this.rooms.delete(id);
    }

    joinRoom(roomId, userId){
        return this.rooms[roomId].join(userId);
    }

    leaveRoom(id){
        this.rooms[id].leave();
    }

    getRoom(id) {
        const room = this.rooms[id];

        return room ? room.serialize() : null;
    }

    getRooms() {
        return Array.from(this.rooms.values()).map(c => c.serialize());
    }
};
