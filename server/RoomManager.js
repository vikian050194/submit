const Room = require("./Room");

module.exports = class RoomManager {
    constructor(){
        this.rooms = new Map();

        const defaultRoom = new Room(1, "Default");
        this.rooms.set(defaultRoom.id, defaultRoom);
    }
    
    addRoom(){
        this.rooms.set(name, new Room());
    }

    deleteRoom(id){
        this.rooms.delete(id);
    }

    joinRoom(id){
        this.rooms[id].join();
    }

    leaveRoom(id){
        this.rooms[id].leave();
    }

    getRoom(id) {
        const room = this.rooms.get(id);

        return room ? room.serialize() : null;
    }

    getRooms() {
        return Array.from(this.rooms.values()).map(c => c.serialize());
    }
};
