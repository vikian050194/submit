const IdGenerator = require("./utils/idGenerator");

class User {
    constructor(name) {
        this.name = name;
        this.online = true;
    }
}

module.exports = class UserManager {
    constructor() {
        this.generator = new IdGenerator();
        this.users = new Map();

        //TODO Remove test user
        const id = this.generator.generateUserId();
        const user = new User("user");
        user.online = false;
        this.users.set(id, user);
    }

    join({ name }) {
        for (const iterator of this.users) {
            const [id, user] = iterator;
            const isNameInUse = user.name === name;

            if (isNameInUse) {
                if (user.online) {
                    return new Error("Name in use");
                }
                else {
                    return { id, name };
                }
            }
        }

        const id = this.generator.generateUserId();
        this.users.set(id, new User(name));

        return { id, name };
    }

    quit({ id }) {
        const user = this.users.get(id);

        if (!user) {
            return false;
        }

        user.online = false;

        return true;
    }
};