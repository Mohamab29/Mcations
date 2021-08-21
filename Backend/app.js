// getting global config files
global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
// getting environment variables
require('dotenv').config({ path: './.env' });

// requires for express
const express = require('express');
const expressRateLimit = require("express-rate-limit");
const server = express();

// requiring the controllers
const authController = require("./controllers/auth-controller");
const imageController = require("./controllers/image-controller");
const vacationsController = require("./controllers/vacations-controller");
const followersController = require("./controllers/followers-controller");

// limiting the number of requests 
server.use("/api/", expressRateLimit({
    windowMs: 800, // time window
    max: 4, // max requests allowed in that time window from the same user
    message: "Hey you!!\nstop DOSing our website!." // Error message.
}));

server.use(express.json());

// our controllers
server.use("/api/auth", authController);
server.use("/api/images", imageController);
server.use("/api/vacations", vacationsController);
server.use("/api/followers", followersController);

// catching routes that we didn't build and send an error
server.use("*", (_, response) => {
    response.status(404).send("Route was not found");
});

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on ${port} ...`))