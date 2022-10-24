const Status = {
    CREATED: "created",
    STARTED: "started",
    FINISHED: "finished"
};

Object.freeze(Status);

module.exports = class Game {
    constructor({ id, arenaId, status, round, capacity, slot }) {
        this.id = id;
        this.arenaId = arenaId;
        this.status = status;
        this.round = round;
        this.capacity = capacity;
        this.slot = slot;
    }
};

module.exports.Status = Status;