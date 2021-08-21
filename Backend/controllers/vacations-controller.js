const express = require("express");
const router = express.Router();
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const errorsHelper = require("../helpers/errors-helper");
const uuidValidateV4 = require("../middleware/check-uuid");
const verifyLoggedIn = require("../middleware/verify-logged-in");

// GET all vacations : */api/vacations
router.get("/", async (request, response) => {
    try {
        // logic
        const vacations = await vacationsLogic.getAllVacations();
        //success
        response.json(vacations);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// GET all vacations : */api/vacations/:uuid
router.get("/:uuid", verifyLoggedIn, uuidValidateV4, async (request, response) => {
    try {
        // data
        const vacationId = request.params.uuid;

        // logic
        const vacation = await vacationsLogic.getOneVacation(vacationId);
        if (!vacation) return response.status(404).send("vacation with given id was not found.");

        //success
        response.json(vacation);
        
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});


module.exports = router;