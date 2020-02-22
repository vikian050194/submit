// const Chat = require("./chat");
// const Arena = require("./arena");

const READY = "READY";

class Player{
    constructor(id){
        this.id = id;

        this.state = READY;
    }
}

module.exports = class Game {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.players = new Map();
        // this.chat = new Chat();
        // this.arena = new Arena();
        this.size = 4;
    }

    join(userId) {
        const isJoined = this.players.has(userId);

        if (!isJoined) {
            const player = new Player(userId);
            this.players.add(userId, player);
        }
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
        const { id, name, size } = this;

        return {
            id,
            name,
            size
        };
    }
};
