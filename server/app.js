const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const expressApplication = express();
const server = require("http").createServer(expressApplication);
const socketServer = require("socket.io")(server);

const foo = require("./foo");

foo(socketServer);

expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: true }));

expressApplication.use(express.static("client/build"));

var router = require("./router");
expressApplication.use("/", router);

server.listen(port, function () {
    console.info("Listening on port " + port);
});