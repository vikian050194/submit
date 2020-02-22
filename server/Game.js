const NOT_READY = "NOT_READY";
const READY = "READY";

const log = (data) =>{
    console.info(data);
};

class User{
    constructor(id, name){
        this.score = 0;
        this.state = NOT_READY;
        this.id = id;
        this.name = name;
    }
}

const names = ["A", "B", "C", "D"];

module.exports = class Game {
    constructor() {
        this.size = 10;
        this.capacity = 4;
        this.users = [];
    }

    join(){
        const id = this.users.length;

        const user = new User(id, names[id]);
        this.users.push(user);

        log(user);

        return user;
    }

    getInfo() {
        const {size, capacity} = this;

        return {
            size,
            capacity
        };
    }

    getState() {
        const { users } = this;

        return {
            users
        };
    }
};
