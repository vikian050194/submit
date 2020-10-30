const applyPattern = require("./applyPattern");

const defaultSize = 10;
const defaultWallPattern = [];
const defaultSpawnPattern = [[0, 0]];

class Snapshot {
    constructor() {
        this.players = [];
    }
}

module.exports = class Arena {
    constructor(size = defaultSize, wallPattern = defaultWallPattern, spawnPattern = defaultSpawnPattern) {
        this._history = [new Snapshot()];

        this.size = size;
        this.walls = applyPattern(size, wallPattern);
        this.spawnPoints = applyPattern(size, spawnPattern);
        this.actions = {};
    }

    getSpawnPoint(id) {
        return this.spawnPoints[id];
    }

    getSpawnPoints() {
        return this.spawnPoints;
    }

    getWalls() {
        return this.walls;
    }

    getSnapshots(index, count) {
        if (index === undefined) {
            return this._history;
        }

        if (count === undefined) {
            return this._history.slice(index);
        }

        return this._history.slice(index, index + count);
    }

    getLastSnapshot() {
        return this._history[this._history.length - 1];
    }

    getSnaphotsCount() {
        return this._history.length;
    }

    removePlayer(credentials) {
        const player = this.getLastSnapshot().players.find(({ id }) => id === credentials.id);

        if (!player) {
            return false;
        }

        const lastSnapshot = this.getLastSnapshot();
        const newSnapshot = { ...lastSnapshot, players: lastSnapshot.players.filter(u => u !== player) };
        this._history.push(newSnapshot);

        return true;
    }

    addPlayer(player) {
        const [x, y] = this.getSpawnPoint(player.id);
        player.x = x;
        player.y = y;

        const lastSnapshot = this.getLastSnapshot();
        const newSnapshot = { ...lastSnapshot, players: [...lastSnapshot.players, player] };
        this._history.push(newSnapshot);

        return player;
    }

    isReady() {
        return Object.keys(this.actions).length === this.getLastSnapshot().players.length;
    }

    submitPlayerActions(id, actions) {
        this.actions[id] = actions;
    }

    submit() {
        const lastSnapshot = this.getLastSnapshot();
        const players = lastSnapshot.players.map(p => { return { ...p, actions: this.actions[p.id] }; });
        const newSnapshot = { ...lastSnapshot, players };
        this._history.push(newSnapshot);
        this.actions = {};
    }

    getStaticData() {
        return {
            size: this.size,
            walls: this.walls
        };
    }

    getFullState() {
        return { ...this.getLastSnapshot(), ...this.getStaticData() };
    }

    updateState({ players }) {
        const lastSnapshot = this.getLastSnapshot();
        const newSnapshot = { ...lastSnapshot, players };
        this._history.push(newSnapshot);
    }
};