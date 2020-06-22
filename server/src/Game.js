const User = require("./User");

const names = ["A", "B", "C", "D"];
const size = 7;
const spawnIndex = 2;
const spawn = [[spawnIndex, spawnIndex], [size - spawnIndex - 1, size - spawnIndex - 1], [spawnIndex, size - spawnIndex - 1], [size - spawnIndex - 1, spawnIndex]];
const wallPattern = [[1, 1], [1, 2], [2, 1]];

const applyPattern = (pattern) => {
    const max = size - 1;

    return [
        ...pattern,
        ...pattern.map(([x, y]) => [max - x, max - y]),
        ...pattern.map(([x, y]) => [max - x, y]),
        ...pattern.map(([x, y]) => [x, max - y])
    ];
};

module.exports = class Game {
    constructor() {
        this.size = size;
        this.walls = applyPattern(wallPattern);
        this.users = [];
        this.capacity = names.length;
    }

    join(credentials) {
        if (credentials && credentials.id !== undefined) {
            const user = this.users.find(({ id }) => id === credentials.id);

            if (user) {
                return { id: user.id };
            }
        }

        if (this.users.length === this.capacity) {
            return { id: null };
        }

        const id = this.users.length;

        const user = new User(id, names[id]);
        const [x, y] = spawn[id];
        user.x = x;
        user.y = y;
        this.users.push(user);

        return { id };
    }

    leave(credentials) {
        if (credentials && credentials.id !== undefined) {
            const user = this.users.find(({ id }) => id === credentials.id);

            if (user) {
                this.users = this.users.filter(u => u !== user);
                return true;
            }
        }

        return false;
    }

    submit({ id: uid, action }) {
        const user = this.users.find(({ id }) => id === uid);
        user.action = action;

        this.tryRun();
    }

    tryRun() {
        const isFullHouse = this.users.length === this.capacity;
        const isActionsPrepared = !this.users.some(({ action }) => action === null);

        if (isFullHouse && isActionsPrepared) {
            this.run();
        }
    }

    run() {
        this.users.forEach((user) => {
            const { x, y, action } = user;
            let newX = action === 0 ? x - 1 : x;
            newX = action === 1 ? x + 1 : newX;
            let newY = action === 2 ? y - 1 : y;
            newY = action === 3 ? y + 1 : newY;
            user.action = null;
            user.x = newX;
            user.y = newY;
        });
    }

    getState() {
        const {
            size,
            walls,
            users,
            capacity
        } = this;

        return {
            size,
            walls,
            users,
            capacity
        };
    }
};