/* eslint-disable no-unused-vars */
const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const expressApplication = express();
const httpServer = require("http").createServer(expressApplication);
const socketServer = require("socket.io")(httpServer);

const ClientManager = require("./ClientManager");
const RoomManager = require("./RoomManager");
const makeHandlers = require("./handlers");

const clientManager = new ClientManager();
const roomManager = new RoomManager();

socketServer.on("connection", (client) => {
    const {
        handleLogin,
        handleLogout,
        handleMessage,
        handleAction
    } = makeHandlers(client, clientManager, roomManager);

    console.info(`New client is connected: ${client.id}`);
    clientManager.addClient(client);

    client.on("login", handleLogin);
    client.on("logout", handleLogout);
    client.on("message", handleMessage);
    client.on("action", handleAction);

    client.on("disconnect", function () {
        console.info(`Client is disconnected: ${client.id}`);
    });

    client.on("error", function (err) {
        console.info(`Received error from client: ${client.id}`);
        console.info(err);
    });
});

expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: true }));

expressApplication.use(express.static("client/build"));

var router = require("./router");
expressApplication.use("/", router);

httpServer.listen(port, function () {
    console.info("Listening on port " + port);
});