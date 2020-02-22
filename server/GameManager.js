const IdGenerator = require("./utils/idGenerator");
const Game = require("./Game");

module.exports = class GameManager {
    constructor(userManager) {
        this.userManager = userManager;

        this.generator = new IdGenerator();
        this.games = new Map();

        ["red", "green", "blue"].forEach(item => {
            const id = this.generator.generateGameId();
            const game = new Game(id, item);
            this.games.set(id, game);
        }, this);
    }

    // addRoom() {
    //     this.rooms.set(name, new Room());
    // }

    // deleteRoom(id) {
    //     this.rooms.delete(id);
    // }

    joinRoom(roomId, userId) {
        return this.rooms.get(roomId).join(userId);
    }

    leaveRoom(roomId) {
        this.rooms.get(roomId).leave();
    }

    getRoom(id) {
        const room = this.rooms.get(id);

        return room ? room.serialize() : null;
    }

    getRooms() {
        return Object.values(this.rooms).map(c => c.serialize());
    }
};
