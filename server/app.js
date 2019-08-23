const port = process.env.PORT || 8080;

const express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io")(server),
    Repository = require("./repository"),
    repository = new Repository();

const systemUser = {
    name: "SYSTEM",
    color: "#D3D3D3"
};

io.on("connection", function (client) {
    repository.getUsers().forEach(u => {
        client.emit("user:login", u);
    });

    repository.getMessages().forEach(m => {
        client.emit("message:new", m);
    });

    client.on("user:login", function (user) {
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