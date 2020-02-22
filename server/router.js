const express = require("express");
const path = require("path");

const Game = require("./Game");

const makeRouter = () => {
    const game = new Game();

    const router = express.Router();

    router.route("/api/join")
        .post((req, res) => {
            const user = game.join();
            res.send(user);
        });

    router.route("/api/game")
        .get((req, res) => {
            res.send(game.getState());
        });

    router.route("/*")
        .get((req, res) => {
            res.sendFile(path.resolve(__dirname + "/../client/build/index.html"));
        });

    router.route("*")
        .all((req, res) => {
            res.sendStatus(404);
        });

    return router;
};

module.exports = makeRouter;