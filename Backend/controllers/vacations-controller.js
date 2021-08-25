const express = require("express");
const router = express.Router();
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const errorsHelper = require("../helpers/errors-helper");
const Vacation = require("../models/vacation");
const uuidValidateV4 = require("../middleware/check-uuid");
const verifyLoggedIn = require("../middleware/verify-logged-in");

// in order to get any of the requests here, I need the user to be logged in.
router.use(verifyLoggedIn);

// GET all vacations : */api/vacations
router.get("/", async (request, response) => {
    try {
        // logic
        const vacations = await vacationsLogic.getAllVacationsAsync();
        //success
        response.json(vacations);
    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// GET one vacation : */api/vacations/:uuid
router.get("/:uuid", uuidValidateV4, async (request, response) => {
    try {
        // data
        const vacationId = request.params.uuid;

        // logic
        const vacation = await vacationsLogic.getOneVacationAsync(vacationId);
        if (!vacation) return response.status(404).send("vacation with given id was not found.");

        //success
        response.json(vacation);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// POST a vacation : */api/vacations
router.post('/', async (request, response) => {
    try {
        // model
        const vacation = new Vacation(request.body);

        // validate
        const errors = vacation.validatePost();
        if (errors) return response.status(400).send(errors);

        // logic
        const addedVacation = await vacationsLogic.AddVacationAsync(vacation);

        // success
        response.status(201).json(addedVacation);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// PUT a vacation : */api/vacations/:uuid
router.put('/:uuid', uuidValidateV4, async (request, response) => {
    try {
        // model
        request.body.vacationId = request.params.uuid;
        const vacation = new Vacation(request.body);

        // validate
        const errors = vacation.validatePut();
        if (errors) return response.status(400).send(errors);

        // logic
        const updatedVacation = await vacationsLogic.updateFullVacationAsync(vacation);
        if (!updatedVacation) return response.status(404).send("vacation with given id was not found.");

        // success
        response.json(updatedVacation);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// PATCH a vacation : */api/vacations/:uuid
router.patch('/:uuid', uuidValidateV4, async (request, response) => {
    try {
        // model
        request.body.vacationId = request.params.uuid;
        const vacation = new Vacation(request.body);

        // validate
        const errors = vacation.validatePatch();
        if (errors) return response.status(400).send(errors);

        // logic
        const updatedVacation = await vacationsLogic.updatePartialVacationAsync(vacation);
        if (!updatedVacation) return response.status(404).send("vacation with given id was not found.");

        // success
        response.json(updatedVacation);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

// delete one vacation : */api/vacations/:uuid
router.delete("/:uuid", uuidValidateV4, async (request, response) => {
    try {
        // data
        const vacationId = request.params.uuid;

        // logic
        const success = await vacationsLogic.deleteVacationAsync(vacationId);
        if (!success) return response.status(404).send("vacation with given id was not found.");

        //success
        response.sendStatus(204);

    } catch (error) {
        errorsHelper.internalServerError(response, error);
    }
});

module.exports = router;