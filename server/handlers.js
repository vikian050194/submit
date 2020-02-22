/* eslint-disable no-unused-vars */
module.exports = (client, userManager, roomManager) => {
    const handleJoin = (user, cb) => {
        userManager.signUp(user);
        handleSignIn(user, cb);
    };

    const handleSignIn = (user, cb) => {
        const result = userManager.signIn(user, client);
        cb && result instanceof Error ? cb("Error", result) : cb("OK", result);
    };

    const handleSignOut = (_, cb) => {
        const isSuccess = userManager.signOut(client.id);
        cb && isSuccess ? cb("OK") : cb("Error");
    };

    const handleJoin = ({ roomId, userId }, cb) => {
        roomManager.join(roomId, userId);
        // client.emit("action", repository.arena);
        cb && cb("OK", null);
    };

    const handleLeave = (_, cb) => {
        // const user = clientManager.getUserByClientId(client.id);
        // repository.removeUser(user);

        // clientManager.removeClient(client);

        // client.broadcast.emit("logout", user);

        // cb && cb("OK");
    };

    const handleMessage = ({ message }, cb) => {
        // const user = clientManager.getUserByClientId(client.id);

        // roomManager.handleMessage();

        // var data = {
        //     user,
        //     message,
        //     date: new Date()
        // };

        // repository.addMessage(data);

        // client.broadcast.emit("message", data);

        // cb && cb("OK", data);
    };

    const handleAction = (actions, cb) => {
        // const user = clientManager.getUserByClientId(client.id);
        // let { x, y } = user.position;

        // for (const action of actions) {
        //     switch (action) {
        //         case "up":
        //             y--;
        //             break;
        //         case "down":
        //             y++;
        //             break;
        //         case "left":
        //             x--;
        //             break;
        //         case "right":
        //             x++;
        //             break;
        //         default:
        //             break;
        //     }
        // }

        // const isUnitOutsideLeftBorder = x < 0;
        // const isUnitOutsideRightBorder = x >= config.size;
        // const isUnitOutsideTopBorder = y < 0;
        // const isUnitOutsideBottomBorder = y >= config.size;
        // const isUnitIntersectSomething = repository.getUsers().filter(({ position }) => position.x === x && position.y === y).length !== 0;

        // if (!isUnitOutsideLeftBorder &&
        //     !isUnitOutsideRightBorder &&
        //     !isUnitOutsideTopBorder &&
        //     !isUnitOutsideBottomBorder &&
        //     !isUnitIntersectSomething) {
        //     user.position.x = x;
        //     user.position.y = y;

        //     cb("OK", user);
        //     client.broadcast.emit("action", user);
        // }
    };

    return {

        handleSignUp,
        handleSignIn,
        handleSignOut,
        handleMessage,
        handleAction
    };
};
