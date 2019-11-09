module.exports = class ClientManager {
    constructor() {
        this.clients = new Map();
    }

    addClient (client) {
        this.clients.set(client.id, { client });
    }

    registerClient(client, user) {
        this.clients.set(client.id, { client, user });
    }

    removeClient(client) {
        this.clients.delete(client.id);
    }

    getAvailableUsers() {
        const usersTaken = new Set(
            Array.from(this.clients.values())
                .filter(c => c.user)
                .map(c => c.user.name)
        );
        return this.userTemplates
            .filter(u => !usersTaken.has(u.name));
    }

    isUserAvailable(userName) {
        return this.getAvailableUsers().some(u => u.name === userName);
    }

    getUserByName(userName) {
        return this.userTemplates.find(u => u.name === userName);
    }

    getUserByClientId(clientId) {
        return (this.clients.get(clientId) || {}).user;
    }
};