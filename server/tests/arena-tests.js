const assert = require("assert");

const applyPattern = require("../src/applyPattern");
const Arena = require("../src/Arena");

describe("Arena helpers", function () {
    it("applyPattern: one block", function () {
        const size = 5;
        const pattern = [[1, 1]];

        const actualCollection = applyPattern(size, pattern);

        const expectedLength = 4;
        const expectedCollection = [[1, 1], [3, 3], [3, 1], [1, 3]];

        assert.equal(actualCollection.length, expectedLength);
        assert.deepEqual(actualCollection, expectedCollection);
    });

    it("applyPattern: three blocks", function () {
        const size = 7;
        const pattern = [[1, 1], [1, 2], [2, 1]];

        const actualCollection = applyPattern(size, pattern);

        const expectedLength = 12;
        const expectedCollection = [
            [1, 1], [1, 2], [2, 1],
            [5, 5], [5, 4], [4, 5],
            [5, 1], [5, 2], [4, 1],
            [1, 5], [1, 4], [2, 5]
        ];

        assert.equal(actualCollection.length, expectedLength);
        assert.deepEqual(actualCollection, expectedCollection);
    });
});

describe("Arena", function () {
    describe("сonstructor", function () {
        it("Empty", function () {
            const arena = new Arena();

            const expectedStepsCount = 1;

            assert.equal(arena.getSnaphotsCount(), expectedStepsCount);
        });

        it("Size is explicitly set", function () {
            const size = 42;
            const arena = new Arena(size);

            const expectedStepsCount = 1;

            assert.equal(arena.getSnaphotsCount(), expectedStepsCount);
        });

        it("Wall pattern is explicitly set", function () {
            const size = 10;
            const wallPattern = [[1, 1]];
            const arena = new Arena(size, wallPattern);

            const expectedWallsLength = 4;

            assert.equal(arena.getWalls().length, expectedWallsLength);
        });

        it("Spawn pattern is explicitly set", function () {
            const size = 10;
            const wallPattern = [];
            const spawnPattern = [[2, 2]];
            const arena = new Arena(size, wallPattern, spawnPattern);

            const expectedSpawnPointsCount = 4;

            assert.equal(arena.getSpawnPoints().length, expectedSpawnPointsCount);
        });
    });

    describe("getStaticData", function () {
        it("Default size and default walls pattern", function () {
            const expectedSize = 10;
            const expectedWallsLength = 0;

            const arena = new Arena();

            const staticData = arena.getStaticData();

            assert.equal(staticData.size, expectedSize);
            assert.equal(staticData.walls.length, expectedWallsLength);
        });

        it("Size is 42 and walls pattern contains one item", function () {
            const expectedSize = 42;
            const expectedWallsLength = 4;
            const testWallsPattern = [[0, 0]];

            const arena = new Arena(42, testWallsPattern);

            const staticData = arena.getStaticData();

            assert.equal(staticData.size, expectedSize);
            assert.equal(staticData.walls.length, expectedWallsLength);
        });
    });

    describe("addPlayer", function () {
        it("One player", function () {
            const arena = new Arena();

            const expectedStepsCount = 2;
            const expectedPlayersCount = 1;

            const player = { id: 0 };

            const addedPlayer = arena.addPlayer(player);

            assert.equal(addedPlayer.x, 0);
            assert.equal(addedPlayer.y, 0);
            assert.equal(addedPlayer.id, player.id);
            assert.equal(arena.getSnaphotsCount(), expectedStepsCount);
            assert.notStrictEqual(arena.getSnapshots(0, 1)[0], arena.getSnapshots(1, 1)[0]);
            assert.equal(arena.getSnapshots(0, 1)[0].players.length, 0);
            assert.equal(arena.getLastSnapshot().players.length, expectedPlayersCount);
        });

        it("Four players", function () {
            const arena = new Arena();

            const expectedStepsCount = 5;
            const expectedPlayersCount = 4;

            arena.addPlayer({ id: 0 });
            arena.addPlayer({ id: 1 });
            arena.addPlayer({ id: 2 });
            arena.addPlayer({ id: 3 });

            assert.equal(arena.getSnaphotsCount(), expectedStepsCount);
            assert.equal(arena.getFullState().players.length, expectedPlayersCount);
            assert.equal(arena.getSnapshots(0, 1)[0].players.length, 0);
            assert.equal(arena.getSnapshots(1, 1)[0].players.length, 1);
            assert.equal(arena.getSnapshots(2, 1)[0].players.length, 2);
            assert.equal(arena.getSnapshots(3, 1)[0].players.length, 3);
        });

        describe("removePlayer", function () {
            it("Remove single added player", function () {
                const arena = new Arena();

                const expectedStepsCount = 3;
                const expectedPlayersCount = 0;

                const player = { id: 0 };

                arena.addPlayer(player);
                const isSuccess = arena.removePlayer(player);

                assert.equal(isSuccess, true);
                assert.equal(arena.getSnaphotsCount(), expectedStepsCount);
                assert.equal(arena.getSnapshots(0, 1)[0].players.length, 0);
                assert.equal(arena.getSnapshots(1, 1)[0].players.length, 1);
                assert.equal(arena.getSnapshots(2, 1)[0].players.length, 0);
                assert.equal(arena.getLastSnapshot().players.length, expectedPlayersCount);
            });
        });
    });
});