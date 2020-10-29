class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.score = 0;
        this.x = 0;
        this.y = 0;
        this.action = null;
        this.hp = 3;
    }
}

module.exports = Player;
