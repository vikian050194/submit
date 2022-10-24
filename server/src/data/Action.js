const Value = {
    EMPTY: "empty",
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down"
};

Object.freeze(Value);

module.exports = class Action {
    constructor({ id, playerId, round, index, value }) {
        this.id = id;
        this.playerId = playerId;
        this.round = round;
        this.index = index;
        this.value = value;
    }
};

module.exports.Value = Value;