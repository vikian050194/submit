const randomInt = require("random-int");

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

module.exports = class Repository {
    constructor() {
        this.users = [];
        this.messages = [];
        this.walls = [];
        this.blocks = [];

        const size = 10;
        const max = size - 1;

        for (let i = 0; i < size; i++) {
            this.arena.push(new Cell(i, max));
            this.arena.push(new Cell(max, i));
        }

        for (let i = 0; i < size - 1; i++) {
            this.arena.push(new Cell(i, 0));
        }

        for (let i = 1; i < size - 1; i++) {
            this.arena.push(new Cell(0, i));
        }
    }

    getColor() {
        let index = null;

        do {
            index = randomInt(0, 3);
        } while ((this.users.filter((u) => u.color === index).length !== 0));

        return index;
    }

    getPosition() {
        return {
            x: randomInt(1, 8),
            y: randomInt(1, 8)
        };
    }

    getMessages() {
        return this.messages;
    }

    addMessage(data) {
        this.messages.push(data);

        if (this.messages.length > 10) {
            this.messages.shift();
        }
    }

    addUser(user) {
        const position = this.getPosition();
        const color = this.getColor();
        const id = generate(dictionary.lowercase, 2) + generate(dictionary.numbers, 2);

        const newUser = { ...user, position, color, id };

        this.users.push(newUser);

        return newUser;
    }

    getUsers() {
        return this.users;
    }

    removeUser(user) {
        var index = this.users.indexOf(user);
        this.users.splice(index);
    }

    getState() {
        return { arena: this.arena };
    }
};