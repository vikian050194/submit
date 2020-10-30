const Player = require("./Player");
const Arena = require("./Arena");

const names = ["A", "B", "C", "D"];
const size = 10;
const wallPattern = [[1, 1], [1, 2], [2, 1]];
const spawnPattern = [[0, 0]];

module.exports = class Game {
    constructor(capacity = 2, slot = 3) {
        this.capacity = capacity;
        this.slot = slot;

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

    turn(state, index) {
        const players = state.players.map((player) => {
            const { x, y, actions } = player;
            const action = actions[index];

            let newX = action === "left" ? x - 1 : x;
            newX = action === "right" ? x + 1 : newX;
            let newY = action === "up" ? y - 1 : y;
            newY = action === "down" ? y + 1 : newY;

            return { ...player, x: newX, y: newY };
        });

        const newState = { ...state, players };

        return newState;
    }

    run() {
        for (let index = 0; index < this.slot; index++) {
            const state = this.arena.getFullState();
            const newState = this.turn(state, index);
            this.arena.updateState(newState);
        }

    }

    getState() {
        return { ...this.arena.getFullState(), capacity: this.capacity };
    }
};