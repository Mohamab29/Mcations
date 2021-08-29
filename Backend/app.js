// getting global config files
global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
// getting environment variables
require('dotenv').config({ path: './.env' });

// requires for express
const express = require('express');
const expressRateLimit = require("express-rate-limit");
const cors = require("cors");
const server = express();

// Socket.io logic
const socketLogic = require("./business-logic-layer/real-time-logic");

// requiring the controllers
const authController = require("./controllers/auth-controller");
const imageController = require("./controllers/image-controller");
const vacationsController = require("./controllers/vacations-controller");
const followersController = require("./controllers/followers-controller");

server.use(cors());

// limiting the number of requests 
// server.use("/api", expressRateLimit({
//     windowMs: 1000, // time window
//     max: 5, // max requests allowed in that time window from the same user
//     message: "Hey you!!\nstop DOSing our website!." // Error message.
// }));
server.use(express.json());


// our controllers
server.use("/api/auth", authController);
server.use("/api/images", imageController);
server.use("/api/vacations", vacationsController);
server.use("/api/followers", followersController);

// catching routes that we didn't build and send an error
server.use("*", (_, response) => {
    response.status(404).send(_.originalUrl + " route was not found");
});

const port = process.env.PORT || 3001;

const listener = server.listen(port, () => console.log(`Listening on ${port} ...`));

socketLogic.init(listener);
