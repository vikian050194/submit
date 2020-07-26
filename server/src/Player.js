class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.action = null;
        this.score = 0;
        this.x = 0;
        this.y = 0;
        this.actions = [];
        this.hp = 3;
    }
}

module.exports = Player;
