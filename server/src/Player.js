class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.x = 0;
        this.y = 0;

        this.score = 0;
        this.health = 3;
    }
}

module.exports = Player;
