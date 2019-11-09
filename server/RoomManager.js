const Room = require("./Room");
module.exports = class RoomManager {
    constructor(){
        this.rooms = new Map();
        this.rooms.set("Default", new Room());
    }
    
    removeClient(client) {
        this.rooms.forEach(c => c.removeUser(client));
    }

    getChatroomByName(chatroomName) {
        return this.rooms.get(chatroomName);
    }

    serializeChatrooms() {
        return Array.from(this.chatrooms.values()).map(c => c.serialize());
    }
};
