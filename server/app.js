const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Repository = require("./repository");
const repository = new Repository();
const randomInt = require("random-int");

const config = require("./config.json");

const systemUser = {
    name: "SYSTEM",
    color: "#D3D3D3"
};

const getPosition = () => {
    return {
        x: randomInt(0, config.size.x - 1),
        y: randomInt(0, config.size.y - 1)
    };
};

const getColor = () => {
    let color = null;
    let index = null;

    const users = repository.getUsers();

    do {
        index = randomInt(0, config.colors.length - 1);
        color = config.colors[index].value;
    } while ((users.filter((u) => u.color === color).length !== 0));

    return color;
};

io.on("connection", function (client) {
    repository.getUsers().forEach(u => {
        client.emit("user:login", u);
    });

    repository.getMessages().forEach(m => {
        client.emit("message:new", m);
    });

    client.on("user:login", function (user) {
        user.position = getPosition();
        user.color = getColor();
        client.user = user;

        console.info(`"${user.name}" is logged in`);

        client.emit("user:login", user);
        client.broadcast.emit("user:login", user);

        repository.addUser(user);
        repository.addMessage({
            user: systemUser,
            message: `${user.name} is logged in`
        });
        client.emit("message:new", {
            user: systemUser,
            message: `${user.name} is logged in`
        });
        client.broadcast.emit("message:new", {
            user: systemUser,
            message: `${user.name} is logged in`
        });
    });

    client.on("user:logout", function () {
        if (client.user === undefined) {
            return;
        }

        console.info(`"${client.user.name}" is logged out`);

        client.broadcast.emit("user:logout", client.user);

        repository.removeUser(client.user);
        repository.addMessage({
            user: systemUser,
            message: `${client.user.name} is logged out`
        });
        client.emit("message:new", {
            user: systemUser,
            message: `${client.user.name} is logged out`
        });
        client.broadcast.emit("message:new", {
            user: systemUser,
            message: `${client.user.name} is logged out`
        });
    });

    client.on("message:send", function (message) {
        var data = {
            user: client.user,
            message
        };

        client.emit("message:new", data);
        client.broadcast.emit("message:new", data);

        repository.addMessage(data);
    });

    client.on("action:move", function (direction) {
        switch (direction) {
            case "Up":
                if(this.user.position.y !== 0){
                    this.user.position.y--;
                }
                break;
            case "Down":
                if(this.user.position.y !== config.size.y - 1){
                    this.user.position.y++;
                }
                break;
            case "Left":
                if(this.user.position.x !== 0){
                    this.user.position.x--;
                }
                break;
            case "Right":
                if(this.user.position.x !== config.size.x - 1){
                    this.user.position.x++;
                }
                break;
            default:
                break;
        }

        client.emit("user:move", this.user);
        client.broadcast.emit("user:move", this.user);
    });

    console.info("New user is connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/build"));

var router = require("./router");
app.use("/", router);

server.listen(port, function () {
    console.info("Listening on port " + port);
});