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

router.route("/leave")
    .post((req, res) => {
        const credentials = req.body;

        game.leave(credentials);
        res.send({ id: null });
    });

router.route("/submit")
    .post((req, res) => {
        const data = req.body;

        game.submit(data);
        res.sendStatus(204);
    });

router.route("/state")
    .get((req, res) => {
        res.send(game.getState());
    });

router.route("*")
    .all((req, res) => {
        res.sendStatus(404);
    });

module.exports = router;