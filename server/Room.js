const Repository = require("./repository");
const config = require("./config.json");

module.exports = class Room {
    constructor() {
        this.repository = new Repository();
        this.members = new Map();
    }
};

function broadcastMessage(message) {
    members.forEach(m => m.emit("message", message));
}

function addEntry(entry) {
    chatHistory = chatHistory.concat(entry);
}

function getChatHistory() {
    return chatHistory.slice();
}

function addUser(client) {
    members.set(client.id, client);
}

function removeUser(client) {
    members.delete(client.id);
}

function serialize() {
    return {
        name,
        image,
        numMembers: members.size
    };
}