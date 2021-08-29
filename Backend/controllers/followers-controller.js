const express = require("express");
const router = express.Router();
const followersLogic = require("../business-logic-layer/followers-logic");
const errorsHelper = require("../helpers/errors-helper");
const Follower = require("../models/follower");
const uuidValidateV4 = require("../middleware/check-uuid");
const verifyLoggedIn = require("../middleware/verify-logged-in");

// in order to get any of the requests here, I need the user to be logged in.
router.use(verifyLoggedIn);

// GET all followed vacations by user id: */api/followers/by-user-id/:uuid
router.get('/by-user-id/:uuid', uuidValidateV4, async (request, response) => {
    try {
        // data
        const userId = request.params.uuid;

        // logic
        const vacations = await followersLogic.getFollowedVacationsByUserIdAsync(userId);

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

        // success
        response.json(users);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// number of followers for each vacation
// GET number of followers : /api/followers/all-followed-vacations/
router.get('/all-followed-vacations/', async(request, response)=>{
    try {
        // logic
        const followers = await followersLogic.getFollowersNumber();

        //success
        response.json(followers);
    } catch (error) {
        errorsHelper.internalServerError(response,error);
    }
});

// POST a follower: */api/followers
router.post('/', async (request, response) => {
    try {
        // data and model
        const follower = new Follower(request.body);

        // validation
        const errors = follower.validate();
        if (errors) return response.status(400).send(errors);

        // logic
        const addedFollower = await followersLogic.addFollowerAsync(follower);
        if (!addedFollower) {
            return response.send(false);
        }
        //  success
        response.status(201).json(addedFollower);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// delete one follower : */api/followers/:vacationId/:userId
router.delete("/:vacationId/:userId", async (request, response) => {
    try {


        // data and model
        const follower = new Follower(request.params)
        // validation
        const errors = follower.validate();
        if (errors) return response.status(400).send(errors);

        // logic
        const success = await followersLogic.deleteFollowerAsync(follower);
        if (!success) return response.status(404).send("either the vacation id or the user id given were not found.");

        //success
        response.sendStatus(204);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

module.exports = router;
