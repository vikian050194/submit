const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const expressApplication = express();
const httpServer = require("http").createServer(expressApplication);
const router = require("./router");
const logger = require("./logger");

expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: true }));

expressApplication.use(logger);

expressApplication.use("/", router);

httpServer.listen(port, () => {
    console.info("Listening on port " + port);
});