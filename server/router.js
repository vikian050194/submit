const express = require("express");
const router = express.Router();
const path = require("path");

const config = require("./config.json");

if (process.env.NODE_ENV === "production") {
    router.route("/")
        .get(function (req, res) {
            res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"));
        });
}

router.route("/config")
    .get(function (req, res) {
        res.json(config);
    });

router.route("*")
    .all(function (req, res) {
        res.sendStatus(404);
    });

module.exports = router;