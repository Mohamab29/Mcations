const express = require("express");
const router = express.Router();
const followersLogic = require("../business-logic-layer/followers-logic");
const errorsHelper = require("../helpers/errors-helper");
const uuidValidateV4 = require("../middleware/check-uuid");
const Follower = require("../models/follower");

// GET all followed vacations by user id: */api/followers/by-user-id/:uuid
router.get('/by-user-id/:uuid', uuidValidateV4, async (request, response) => {
    try {
        // data
        const userId = request.params.uuid;

        // logic
        const vacations = await followersLogic.getFollowedVacationsByUserIdAsync(userId);
        if (vacations.length === 0) return response.status(404).send("No followed vacations were found for this user id.")

        // success
        response.json(vacations);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});
// GET all following users by vacation id: */api/followers/by-vacation-id/:uuid
router.get('/by-vacation-id/:uuid', uuidValidateV4, async (request, response) => {
    try {
        // data
        const vacationId = request.params.uuid;

        // logic
        const users = await followersLogic.getFollowedVacationsByVacationIdAsync(vacationId);
        if (users.length === 0) return response.status(404).send("No following users were found for this vacation id.")

        // success
        response.json(users);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

router.post('/', async (request, response) => {
    try {
        // data and model
        const follower = new Follower(request.body);

        // validation
        const errors = follower.validatePost();
        if (errors) return response.status(400).send(errors);

        // logic
        const addedFollower = await followersLogic.addFollowerAsync(follower);

        //  success
        response.status(201).json(addedFollower);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});


module.exports = router;
