//https://dev.to/brightdevs/http-request-logging-in-nodejs-42od

const getTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const logger = (req, res, next) => {
    console.info(`${getTime()} ${req.method} ${req.originalUrl}`);

    res.on("finish", () => {
        console.info(`${getTime()} ${req.method} ${req.originalUrl} ${res.statusCode}`);
        if(req.method === "POST"){
            console.info(req.body);
        }
        // console.info(`${res.statusCode} ${res.statusMessage}; ${res.get("Content-Length") || 0}b sent`);
    });

    next();
};

module.exports = logger;