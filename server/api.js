const Repository = require("./repository");
const repository = new Repository();

const randomInt = require("random-int");
const nanoid = require("nanoid");

const config = require("./config.json");

const systemUser = {
    name: "SYSTEM",
    color: "s"
};

const getPosition = () => {
    return {
        x: randomInt(0, config.size.x - 1),
        y: randomInt(0, config.size.y - 1)
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

const Api = (socketServer) => {
    socketServer.on("connection", function (client) {
        client.on("login", function (user) {
            user.position = getPosition();
            user.color = getColor();
            user.id = nanoid();

            client.user = user;

            console.info(`"${user.name}" is logged in`);

            repository.getUsers().forEach(u => {
                client.emit("login", u);
            });
    
            repository.getMessages().forEach(m => {
                client.emit("message", m);
            });

            client.emit("login", user);
            client.broadcast.emit("login", user);

            repository.addUser(user);

            repository.addMessage({
                user: systemUser,
                message: `${user.name} is logged in`
            });
            client.emit("message", {
                user: systemUser,
                message: `${user.name} is logged in`
            });
            client.broadcast.emit("message", {
                user: systemUser,
                message: `${user.name} is logged in`
            });
        });

        client.on("logout", function () {
            if (client.user === undefined) {
                return;
            }

            console.info(`"${client.user.name}" is logged out`);

            client.broadcast.emit("logout", client.user);

            repository.removeUser(client.user);
            repository.addMessage({
                user: systemUser,
                message: `${client.user.name} is logged out`
            });
            client.emit("message", {
                user: systemUser,
                message: `${client.user.name} is logged out`
            });
            client.broadcast.emit("message", {
                user: systemUser,
                message: `${client.user.name} is logged out`
            });
        });

        client.on("message", function (message) {
            var data = {
                user: client.user,
                message
            };

            client.emit("message", data);
            client.broadcast.emit("message", data);

            repository.addMessage(data);
        });

        client.on("action:move", function (direction) {
            const { user } = client;
            let { x, y } = user.position;

            switch (direction) {
                case "Up":
                    y--;
                    break;
                case "Down":
                    y++;
                    break;
                case "Left":
                    x--;
                    break;
                case "Right":
                    x++;
                    break;
                default:
                    break;
            }

            const isUnitOutsideLeftBorder = x < 0;
            const isUnitOutsideRightBorder = x >= config.size.x;
            const isUnitOutsideTopBorder = y < 0;
            const isUnitOutsideBottomBorder = y >= config.size.y;
            const isUnitIntersectSomething = repository.getUsers().filter(({ position }) => position.x === x && position.y === y).length !== 0;

            if (!isUnitOutsideLeftBorder &&
                !isUnitOutsideRightBorder &&
                !isUnitOutsideTopBorder &&
                !isUnitOutsideBottomBorder &&
                !isUnitIntersectSomething) {
                user.position.x = x;
                user.position.y = y;

                client.emit("user:move", user);
                client.broadcast.emit("user:move", user);
            }
        });

        console.info("New user is connected");
    });
};

module.exports = Api;