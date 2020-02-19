const IdGenerator = require("./utils/idGenerator");
const Room = require("./Room");

module.exports = class RoomManager {
    constructor(){
        this.generator = new IdGenerator();
        this.rooms = {};

        const roomId = this.generator.generateRoomId();
        const defaultRoom = new Room(roomId, "Default");
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
        return Object.values(this.rooms).map(c => c.serialize());
    }
};
