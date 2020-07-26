const applyPattern = require("./applyPattern");

const defaultSize = 10;
const defaultWallPattern = [];
const defaultSpawnPattern = [[0, 0]];

class Step {
    constructor() {
        this.players = [];
    }
}

module.exports = class Arena {
    constructor(size = defaultSize, wallPattern = defaultWallPattern, spawnPattern = defaultSpawnPattern) {
        this._steps = [new Step()];

        this._size = size;
        this._walls = applyPattern(size, wallPattern);
        this._spawnPoints = applyPattern(size, spawnPattern);
    }

    getSpawnPoint(id) {
        return this._spawnPoints[id];
    }

    getSpawnPoints() {
        return this._spawnPoints;
    }

    getWalls() {
        return this._walls;
    }

    getSteps(index, count) {
        if (index === undefined) {
            return this._steps;
        }

        if (count === undefined) {
            return this._steps.slice(index);
        }

        return this._steps.slice(index, index + count);
    }

    getLastStep() {
        return this._steps[this._steps.length - 1];
    }

    getStepsCount() {
        return this._steps.length;
    }

    addPlayer(player) {
        const [x, y] = this.getSpawnPoint(player.id);
        player.x = x;
        player.y = y;

        const lastStep = this.getLastStep();
        const newStep = { ...lastStep, players: [...lastStep.players, player] };
        this._steps.push(newStep);

        return player;
    }

    getState() {
        return this.getLastStep();
    }
};