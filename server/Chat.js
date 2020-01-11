const Message = require("./Message");

module.exports = class Chat {
    constructor() {
        this.messages = [];
        this.last = 10;
    }

    addMessage(message, userId) {
        this.messages.push(new Message(message, userId, new Date()));

        if (this.messages.length > this.last) {
            this.messages.shift();
        }
    }

    getMessages() {
        return this.messages;
    }
};