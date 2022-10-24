const express = require("express");

const Foo = require("./Foo");
const foo = new Foo();

const router = express.Router();

router.route("/join")
    .post((req, res) => {
        const credentials = req.body;

        const user = foo.join(credentials);
        res.send(user);
    });

router.route("/leave")
    .post((req, res) => {
        const credentials = req.body;

        foo.leave(credentials);
        res.send({ id: null });
    });

router.route("/submit")
    .post((req, res) => {
        const data = req.body;

        foo.submit(data);
        res.sendStatus(204);
    });

router.route("/state")
    .get((req, res) => {
        res.send(foo.getState());
    });

router.route("*")
    .all((req, res) => {
        res.sendStatus(404);
    });

module.exports = router;