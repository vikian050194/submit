const generate = require("nanoid/generate");
const dictionary = require("nanoid-dictionary");

class User {
    constructor(name, login, password) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.online = true;
    }
}

module.exports = class UserManager {
    constructor() {
        this.users = new Map();

        //TODO Remove test user
        const id = "ab12";
        const user = new User("user", "user", "user");
        this.users.set(id, user);
    }

    signUp({ name, login, password }) {
        for (const iterator of this.users) {
            const [id, user] = iterator;
            const isLoginInUse = user.login === login;

            if (isLoginInUse) {
                return new Error("Login in use");
            }
        }

        const id = generate(dictionary.lowercase, 2) + generate(dictionary.numbers, 2);
        this.users.set(id, new User(name, login, password));

        return { id, name };
    }

    signIn({ login, password }) {
        for (const iterator of this.users) {
            const [id, user] = iterator;
            const isCredentialsValid = user.login === login && user.password === password;

            if (isCredentialsValid) {
                user.online = true;
                return { id, name: user.name };
            }
        }

        return new Error("Sign in failed");
    }

    signOut({ id }) {
        const user = this.users.get(id);

        if (!user) {
            return false;
        }

        user.online = false;

        return true;
    }
};