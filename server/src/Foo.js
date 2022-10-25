const Arena = require("./data/Arena");
const Game = require("./data/Game");
const Status = require("./data/Game").Status;
const Inventory = require("./data/Inventory");
const Type = require("./data/Inventory").Type;
const User = require("./data/User");
const Player = require("./data/Player");
const Action = require("./data/Action");
const Value = require("./data/Action").Value;

const Repository = require("./repository");

const applyPattern = require("./applyPattern");

const names = ["A", "B", "C", "D"];
const size = 10;
const capacity = 2;
const slot = 3;
const health = 3;
const wallPattern = [[1, 1], [1, 2], [2, 1]];
const spawnPattern = [[0, 0]];

module.exports = class Foo {
    constructor() {
        this.actionRepo = new Repository();
        this.arenaRepo = new Repository();
        this.gameRepo = new Repository();
        this.playerRepo = new Repository();
        this.inventoryRepo = new Repository();
        this.userRepo = new Repository();

        const arena = this.arenaRepo.create(new Arena({
            name: "name",
            height: size,
            width: size
        }));

        this.gameRepo.create(new Game({
            arenaId: arena.id,
            status: Status.CREATED,
            round: 1,
            capacity,
            slot
        }));

        for (const [x, y] of applyPattern(size, wallPattern)) {
            this.inventoryRepo.create(new Inventory({
                arenaId: arena.id,
                type: Type.WALL,
                x,
                y
            }));
        }

        for (const [x, y] of applyPattern(size, spawnPattern)) {
            this.inventoryRepo.create(new Inventory({
                arenaId: arena.id,
                type: Type.SPAWN,
                x,
                y
            }));
        }

        this.userRepo.create(new User({
            name: "A"
        }));
        this.userRepo.create(new User({
            name: "B"
        }));
    }

    join(credentials) {
        const game = this.gameRepo.read()[0];

        if (credentials && credentials.id === null) {
            credentials.id = this.playerRepo.read().filter(p => p.gameId === game.id).length + 1;
        }

        if (credentials && credentials.id !== null) {
            const user = this.userRepo.read(credentials.id);

            if (!user) {
                return null;
            }

            const player = this.playerRepo.read(credentials.id);

            if (player) {
                return player;
            }

            if (this.playerRepo.read().filter(p => p.gameId === game.id).length === game.capacity) {
                return null;
            }

            const newPlayer = this.playerRepo.create(new Player({
                userId: user.id,
                gameId: game.id,
                health
            }));
            const spawn = this.inventoryRepo.read().filter(i => i.type === Type.SPAWN)[newPlayer.id - 1];
            newPlayer.x = spawn.x;
            newPlayer.y = spawn.y;

            // TODO return Player view
            const updatedPlayer = this.playerRepo.update(newPlayer);
            updatedPlayer.name = user.name;

            if (this.playerRepo.read().filter(p => p.gameId === game.id).length === game.capacity) {
                game.status = Status.STARTED;
            }

            return updatedPlayer;
        }

        return null;
    }

    leave(credentials) {
        if (credentials && credentials.id !== null) {
            this.playerRepo.delete(credentials.id);
        }

        return false;
    }

    isReady(gameId) {
        const game = this.gameRepo.read(gameId);
        const players = this.playerRepo.read().filter(p => p.gameId === game.id);

        for (const player of players) {
            const isPlayerReary = this.actionRepo.read().filter(a => a.round === game.round && a.playerId === player.id).length === game.slot;
            if (isPlayerReary === false) {
                return false;
            }
        }
        return true;
    }

    submit({ id: playerId, actions }) {
        const game = this.gameRepo.read()[0];

        // TODO make submit idempotent

        for (let index = 0; index < actions.length; index++) {
            const element = actions[index];
            this.actionRepo.create(new Action({
                value: element,
                round: game.round,
                index,
                playerId
            }));
        }

        if (this.isReady(game.id)) {
            this.run(game.id);
        }
    }

    turn(gameId, index) {
        const game = this.gameRepo.read(gameId);
        const players = this.playerRepo.read().filter(p => p.gameId === game.id);

        for (const player of players) {
            const action = this.actionRepo.read().find(a => a.playerId === player.id && a.round === game.round && a.index === index);

            const { x, y } = player;

            let newX = action.value === Value.LEFT ? x - 1 : x;
            newX = action.value === Value.RIGHT ? x + 1 : newX;
            let newY = action.value === Value.UP ? y - 1 : y;
            newY = action.value === Value.DOWN ? y + 1 : newY;

            player.x = newX;
            player.y = newY;
            this.playerRepo.update(player);
        }
    }

    run(gameId) {
        const game = this.gameRepo.read(gameId);
        for (let index = 0; index < game.slot; index++) {
            this.turn(gameId, index);
        }
        game.round++;
        this.gameRepo.update(game);
    }

    getState() {
        // TODO update this code
        // return { ...this.arena.getFullState(), capacity: this.capacity };
        const game = this.gameRepo.read()[0];
        const arena = this.arenaRepo.read(game.arenaId);
        const walls = this.inventoryRepo.read().filter(i => i.type === Type.WALL).map(i => [i.x, i.y]);
        const players = this.playerRepo.read().filter(p => p.gameId === game.id);
        return {
            capacity: game.capacity,
            size: arena.height,
            walls,
            players
        };
    }
};