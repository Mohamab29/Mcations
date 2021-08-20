// getting global config files
global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
// getting environment variables
require('dotenv').config({ path: './.env' });
// requires
const express = require('express');
const authController = require("./controllers/auth-controller");
const expressRateLimit = require("express-rate-limit");
const server = express();

server.use("/api/", expressRateLimit({
    windowMs: 800, // time window
    max: 4, // max requests allowed in that time window from the same user
    message: "Hey you!!\nstop DOSing our website!." // Error message.
}));

server.use(express.json());

// our controllers
server.use("/api/auth", authController);

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on ${port} ...`))