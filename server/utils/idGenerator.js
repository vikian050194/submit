const generate = require("nanoid/generate");
const dictionary = require("nanoid-dictionary");

module.exports = class IdGenerator {
    generateId() {
        return `${generate(dictionary.lowercase, 2)}${generate(dictionary.numbers, 2)}`;
    }

    generateUserId() {
        return `u${this.generateUserId()}`;
    }

    generateRoomId() {
        return `r${this.generateUserId()}`;
    }
}