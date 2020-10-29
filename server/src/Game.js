const Player = require("./Player");
const Arena = require("./Arena");

const names = ["A", "B", "C", "D"];
const size = 10;
const wallPattern = [[1, 1], [1, 2], [2, 1]];
const spawnPattern = [[0, 0]];

module.exports = class Game {
    constructor(capacity = 2) {
        this.capacity = capacity;
        this.arena = new Arena(size, wallPattern, spawnPattern);
    }

    join(credentials) {
        if (credentials && credentials.id !== null) {
            const player = this.arena.getLastSnapshot().players.find(({ id }) => id === credentials.id);

            if (player) {
                return player;
            }
        }

        if (this.arena.getLastSnapshot().players.length === this.capacity) {
            return { id: null };
        }

        const id = this.arena.getLastSnapshot().players.length;

        const player = new Player(id, names[id]);

        return this.arena.addPlayer(player);
    }

    leave(credentials) {
        if (credentials && credentials.id !== null) {
            return this.arena.removePlayer(credentials);
        }

        return false;
    }

    submit({ id, actions }) {
        this.arena.submitPlayerActions(id, actions);

        if (this.arena.isReady()) {
            this.arena.submit();
            this.run();
        }
    }

    run() {
        this.arena.getLastSnapshot().players.forEach((player) => {
            const { x, y, action } = player;
            
            let newX = action === 0 ? x - 1 : x;
            newX = action === 1 ? x + 1 : newX;
            let newY = action === 2 ? y - 1 : y;
            newY = action === 3 ? y + 1 : newY;
            
            player.action = null;

            player.x = newX;
            player.y = newY;
        });
    }

    getState() {
        return { ...this.arena.getFullState(), capacity: this.capacity };
    }
};