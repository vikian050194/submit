module.exports = class Repository {
    constructor() {
        this.users = [];
        this.messages = [];
    }

    getMessages() {
        return this.messages;
    }

    addMessage(data) {
        this.messages.push(data);

        if (this.messages.length > 10) {
            this.messages.shift();
        }
    }

    addUser(user) {
        if (this.users.indexOf(user) === -1) {
            this.users.push(user);
        }
    }

    getUsers() {
        return this.users;
    }

    removeUser(user) {
        var index = this.users.indexOf(user);
        this.users.splice(index);
    }
};