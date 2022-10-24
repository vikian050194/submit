module.exports = class Player {
    constructor({ id, gameId, userId, health, x, y }) {
        this.id = id;
        this.gameId = gameId;
        this.userId = userId;
        this.health = health;
        this.x = x;
        this.y = y;
    }
};