const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressApplication = express();
const httpServer = require("http").createServer(expressApplication);
const socketServer = require("socket.io")(httpServer);

const UserManager = require("./UserManager");
const GameManager = require("./GameManager");
const makeHandlers = require("./handlers");

const userManager = new UserManager();
const gameManager = new GameManager(userManager);

socketServer.on("connection", (client) => {
    const {
        handleJoin,
        handleQuit,
        handleMessage,
        handleAction
    } = makeHandlers(client, userManager, gameManager);

    console.info(`New client is connected: ${client.id}`);

    userManager.connectClient(client);

    client.on("JOIN", handleJoin);
    client.on("QUIT", handleQuit);
    client.on("MESSAGE", handleMessage);
    client.on("ACTION", handleAction);

    client.on("disconnect", () => {
        userManager.disconnectClient(client);
        console.info(`Client is disconnected: ${client.id}`);
    });

    client.on("error", (err) => {
        console.info(`Received error from client: ${client.id}`);
        console.info(err);
    });
});

expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: true }));

expressApplication.use(cookieParser());

expressApplication.use(express.static("client/build"));

const router = require("./router")(userManager, roomManager);
expressApplication.use("/", router);

httpServer.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
});