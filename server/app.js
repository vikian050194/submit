const port = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require("body-parser");
const expressApplication = express();
const httpServer = require("http").createServer(expressApplication);

expressApplication.use(bodyParser.json());
expressApplication.use(bodyParser.urlencoded({ extended: true }));

expressApplication.use(express.static("server/public"));

const router = require("./router")();
expressApplication.use("/", router);

httpServer.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
});