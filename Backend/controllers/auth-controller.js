const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const User = require("../models/user");
const Credentials = require("../models/credentials");
const router = express.Router();

// POST Register : */api/auth/register 
router.post("/register", async (request, response) => {
    try {
        // Data and model: 
        const user = new User(request.body);

        // Validation: 
        const errors = user.validateRegister();
        if (errors) return response.status(400).send(errors);
        const isUnique = await authLogic.isUniqueUsername(user.username);
        if (!isUnique) return response.status(400).send(`Username "${user.username}" already taken.`);

        // Logic: 
        const addedUser = await authLogic.registerAsync(user);

        // Success: 
        response.status(201).json(addedUser);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// POST Login : */api/auth/register 
router.post("/login", async (request, response) => {
    try {
        // Data and model: 
        const credentials = new Credentials(request.body);

        // Validation: 
        const errors = credentials.validateLogin();
        if (errors) return response.status(400).send(errors);

        // Logic: 
        const loggedInUser = await authLogic.loginAsync(credentials);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");

        // Success: 
        response.json(loggedInUser);
    }
    catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

module.exports = router;
