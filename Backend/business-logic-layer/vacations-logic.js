const dal = require("../data-access-layer/dal");

async function getAllVacations() {
    const sql = "SELECT * FROM vacations";
    const vacations = await dal.executeAsync(sql);
    return vacations;
}

async function getOneVacation(vacationId) {
    const sql = "SELECT * FROM vacations WHERE vacationId = ?";
    const vacations = await dal.executeAsync(sql, [vacationId]);
    return vacations[0];
}

module.exports = {
    getAllVacations,
    getOneVacation,
}