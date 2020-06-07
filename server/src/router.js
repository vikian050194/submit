const express = require("express");

const Game = require("./Game");
const game = new Game();

const router = express.Router();

router.route("/join")
    .post((req, res) => {
        const credentials = req.body;

        const user = game.join(credentials);
        res.send(user);
    });

router.route("/game")
    .get((req, res) => {
        res.send(game.getState());
    });

router.route("*")
    .all((req, res) => {
        res.sendStatus(404);
    });

module.exports = router;