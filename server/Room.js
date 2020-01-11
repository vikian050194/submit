// const Chat = require("./chat");
// const Arena = require("./arena");

module.exports = class Room {
    constructor(id, name) {
        this.id = id;
        this.name= name;
        // this.chat = new Chat();
        // this.arena = new Arena();
        // this.members = new Map();
        this.size = 4;
    }

    // broadcastMessage(message) {
    //     this.members.forEach(m => m.emit("message", message));
    // }
    
    // function addEntry(entry) {
    //     chatHistory = chatHistory.concat(entry);
    // }
    
    // function getChatHistory() {
    //     return chatHistory.slice();
    // }
    
    // function addUser(client) {
    //     members.set(client.id, client);
    // }
    
    // function removeUser(client) {
    //     members.delete(client.id);
    // }
    
    serialize() {
        const {id, name, size} = this;

        return {
            id,
            name,
            size
        };
    }
};
