/* eslint-disable no-unused-vars */
const randomInt = require("random-int");
const nanoid = require("nanoid");

const Repository = require("./repository");
const repository = new Repository();
const config = require("./config.json");

const systemUser = {
    name: "SYSTEM",
    color: "s"
};

const getPosition = () => {
    return {
        x: randomInt(0, config.size - 1),
        y: randomInt(0, config.size - 1)
    };
};

const getColor = () => {
    let index = null;

    const users = repository.getUsers();

    do {
        index = randomInt(0, config.colors - 1);
    } while ((users.filter((u) => u.color === index).length !== 0));

    return index;
};

module.exports = (client, clientManager, roomManager) => {
    function handleLogin(user, cb) {
        clientManager.registerClient(client, user);

        user.position = getPosition();
        user.color = getColor();
        user.id = nanoid();

        client.broadcast.emit("login", user);

        repository.getUsers().forEach(u => {
            client.emit("login", u);
        });

        repository.getMessages().forEach(m => {
            client.emit("message", m);
        });

        repository.addUser(user);

        cb("OK", user);
    }

    function handleLogout(_, cb) {
        const user = clientManager.getUserByClientId(client.id);
        repository.removeUser(user);

        clientManager.removeClient(client);

        client.broadcast.emit("logout", user);

        cb && cb("OK");
    }

    function handleMessage(message, cb) {
        const user = clientManager.getUserByClientId(client.id);

        var data = {
            user,
            message
        };

        repository.addMessage(data);

        client.broadcast.emit("message", data);

        cb("OK", data);
    }

    function handleAction(actions, cb) {
        const user = clientManager.getUserByClientId(client.id);
        let { x, y } = user.position;

        for (const action of actions) {
            switch (action) {
                case "up":
                    y--;
                    break;
                case "down":
                    y++;
                    break;
                case "left":
                    x--;
                    break;
                case "right":
                    x++;
                    break;
                default:
                    break;
            }
        }

        const isUnitOutsideLeftBorder = x < 0;
        const isUnitOutsideRightBorder = x >= config.size;
        const isUnitOutsideTopBorder = y < 0;
        const isUnitOutsideBottomBorder = y >= config.size;
        const isUnitIntersectSomething = repository.getUsers().filter(({ position }) => position.x === x && position.y === y).length !== 0;

        if (!isUnitOutsideLeftBorder &&
            !isUnitOutsideRightBorder &&
            !isUnitOutsideTopBorder &&
            !isUnitOutsideBottomBorder &&
            !isUnitIntersectSomething) {
            user.position.x = x;
            user.position.y = y;

            cb("OK", user);
            client.broadcast.emit("action", user);
        }
    }

    return {
        handleLogin,
        handleLogout,
        handleMessage,
        handleAction
    };
};
