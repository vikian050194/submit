const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const expressApplication = express();
const httpServer = require("http").createServer(expressApplication);
const socketServer = require("socket.io")(httpServer);

const UserManager = require("./UserManager");
const RoomManager = require("./RoomManager");
const makeHandlers = require("./handlers");

const userManager = new UserManager();
const roomManager = new RoomManager();

socketServer.on("connection", (client) => {
    const {
        handleSignUp,
        handleSignIn,
        handleSignOut
        // handleMessage,
        // handleAction
    } = makeHandlers(client, userManager, roomManager);

    console.info(`New client is connected: ${client.id}`);

    client.on("SIGNUP", handleSignUp);
    client.on("SIGNIN", handleSignIn);
    client.on("SIGNOUT", handleSignOut);
    // client.on("MESSAGE", handleMessage);
    // client.on("ACTION", handleAction);

    client.on("disconnect", () => {
        console.info(`Client is disconnected: ${client.id}`);
    });

    client.on("error", (err) => {
        console.info(`Received error from client: ${client.id}`);
        console.info(err);
    });
});

expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: true }));

expressApplication.use(express.static("client/build"));

const router = require("./router")(userManager, roomManager);
expressApplication.use("/", router);

httpServer.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
});