const NOT_READY = "NOT_READY";
const READY = "READY";

const log = (data) => {
    console.info(data);
};

class User {
    constructor(id, name) {
        this.score = 0;
        this.state = NOT_READY;
        this.id = id;
        this.name = name;
        this.x = 0;
        this.y = 0;
    }
}

const names = ["A", "B", "C", "D"];
const size = 10;
const spawn = [[0, 0], [size - 1, size - 1], [0, size - 1], [size - 1, 0]];
const wallPattern = [[1, 1], [1, 2], [1, 3], [2, 1], [3, 1], [3, 3]];
const blockPattern = [[4, 3], [3, 4]];

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
        this.blocks = applyPattern(blockPattern);
        this.users = [];
        this.capacity = 4;
    }

    join(credentials) {
        if (credentials && credentials.id != undefined) {
            const user = this.users.find(u => u.id == credentials.id);

            if (user) {
                log(user);
                return { id: user.id };
            }
        }

        const id = this.users.length;

        const user = new User(id, names[id]);
        const [x, y] = spawn[id];
        user.x = x;
        user.y = y;
        this.users.push(user);

        log(user);

        return { id };
    }

    // getInfo() {
    //     const { size, capacity } = this;

    //     return {
    //         size,
    //         capacity
    //     };
    // }

    getState() {
        const {
            size,
            walls,
            blocks,
            users,
            capacity
        } = this;

        return {
            size,
            walls,
            blocks,
            users,
            capacity
        };
    }
};