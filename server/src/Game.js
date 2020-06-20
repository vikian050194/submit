const { User } = require("./User");

const names = ["A", "B"];
const size = 10;
const spawn = [[0, 0], [size - 1, size - 1], [0, size - 1], [size - 1, 0]];
const wallPattern = [[1, 1], [1, 2], [2, 1], [3, 3]];

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

        const id = this.users.length;

        const user = new User(id, names[id]);
        const [x, y] = spawn[id];
        user.x = x;
        user.y = y;
        this.users.push(user);

        return { id };
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