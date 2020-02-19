const generate = require("nanoid/generate");
const dictionary = require("nanoid-dictionary");

module.exports = class IdGenerator {
    generateId() {
        return `${generate(dictionary.numbers, 4)}`;
    }

    generateUserId() {
        return `u${this.generateId()}`;
    }

    generateRoomId() {
        return `r${this.generateId()}`;
    }
}