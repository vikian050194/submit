const express = require("express");
const path = require("path");

const makeRouter = (userManager, roomManager) => {
    const router = express.Router();

    router.route("/api/signin")
        .post((req, res) => {
            const { login, password } = req.body;
            const result = userManager.signIn({ login, password });

            if (result instanceof Error) {
                res.sendStatus(401);
            } else {
                res.send(result);
            }
        });

    router.route("/api/signup")
        .post((req, res) => {
            const { name, login, password } = req.body;
            const result = userManager.signUp({ name, login, password });

            if (result instanceof Error) {
                res.sendStatus(401);
            } else {
                res.send(result);
            }
        });

    router.route("/api/signout")
        .post((req, res) => {
            const { id } = req.body;
            const result = userManager.signOut({ id});

            if (result instanceof Error) {
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
        });

    router.route("/api/rooms")
        .get((req, res) => {
            res.send(roomManager.getRooms());
        });

    router.route("/api/rooms/:id")
        .get((req, res) => {
            const { id } = req.params;
            const roomId = parseInt(id);
            const room = roomManager.getRoom(roomId);

            room ? res.send(room) : res.sendStatus(404);
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