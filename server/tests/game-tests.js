const assert = require("assert");
const Game = require("../src/Game");

const newPleyerCredentials = null;

describe("Game", function () {
    it("Get initial state", function () {
        const game = new Game();

        const state = game.getState();
        assert.equal(state.size, 10);
        assert.equal(state.capacity, 2);
        assert.equal(state.walls.length, 12);
        assert.equal(state.players.length, 0);
    });

    it("Join two new players", function () {
        const game = new Game();

        const joinedFirstPlayer = game.join(newPleyerCredentials);
        const joinedSecondPlayer = game.join(newPleyerCredentials);

        const state = game.getState();
        assert.equal(joinedFirstPlayer.id, 0);
        assert.equal(joinedSecondPlayer.id, 1);
        assert.equal(state.players.length, 2);
    });

    it("One player join two times in a row", function () {
        const game = new Game();

        const joinedPlayer = game.join(newPleyerCredentials);
        const rejoinedPlayer = game.join(joinedPlayer);

        const state = game.getState();
        assert.equal(joinedPlayer.id, 0);
        assert.equal(rejoinedPlayer.id, 0);
        assert.equal(state.players.length, 1);
    });

    it("Join and leave", function () {
        const game = new Game();

        const joinedPlayer = game.join(newPleyerCredentials);
        const isLeaved = game.leave(joinedPlayer);

        const state = game.getState();
        assert.equal(isLeaved, true);
        assert.equal(state.players.length, 0);
    });
});