const Type = {
    WALL: "wall",
    SPAWN: "spawn"
};

Object.freeze(Type);

module.exports = class Inventory {
    constructor({ id, arenaId, x, y, type }) {
        this.id = id;
        this.arenaId = arenaId;
        this.x = x;
        this.y = y;
        this.type = type;
    }
};

module.exports.Type = Type;