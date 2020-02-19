const express = require("express");
const path = require("path");

const makeRouter = (userManager, roomManager) => {
    const router = express.Router();

    router.route("/api/join")
        .post((req, res) => {
            const { name } = req.body;
            const result = userManager.join({ name });

            if (result instanceof Error) {
                res.sendStatus(401);
            } else {
                res.cookie("id", result.id, { httpOnly: true });
                res.send(result);
            }
        });

    router.route("/api/quit")
        .post((req, res) => {
            const { id } = req.body;
            const result = userManager.quit({ id });

            if (result instanceof Error) {
                res.sendStatus(400);
            } else {
                res.clearCookie("id");
                res.sendStatus(204);
            }
        });

    router.route("/api/games")
        .get((req, res) => {
            res.send(roomManager.getRooms());
        });

    router.route("/api/games/:id")
        .get((req, res) => {
            const { id } = req.params;
            const roomId = parseInt(id);
            const room = roomManager.getRoom(roomId);

            room ? res.send(room) : res.sendStatus(404);
        });

    router.route("/api/games/:roomId/join")
        .post((req, res) => {
            const { roomId } = req.params;
            const userId = req.cookies["id"];
            
            try{
                roomManager.joinRoom(roomId, userId);
                res.sendStatus(204);
            } catch(error){
                res.sendStatus(500);
            }
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