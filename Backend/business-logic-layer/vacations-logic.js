const dal = require("../data-access-layer/dal");
const uuid = require("uuid");

async function getAllVacationsAsync() {
    const sql = "SELECT * FROM vacations";
    const vacations = await dal.executeAsync(sql);
    return vacations;
}

async function getOneVacationAsync(vacationId) {
    const sql = "SELECT * FROM vacations WHERE vacationId = ?";
    const vacations = await dal.executeAsync(sql, [vacationId]);
    return vacations[0];
}

async function AddVacationAsync(vacation) {
    vacation.vacationId = uuid.v4();
    const sql = "INSERT INTO vacations VALUES(?, ?, ?, ?, ?, ?, ?)";
    await dal.executeAsync(sql, [
        vacation.vacationId,
        vacation.description,
        vacation.destination,
        vacation.price,
        vacation.startDate,
        vacation.endDate,
        vacation.imageName,
    ])
    return vacation;
}
async function updateFullVacationAsync(vacation) {
    const sql = `UPDATE vacations 
    SET description = ?, destination = ?, price = ?, startDate = ?, endDate = ?, imageName = ?
    WHERE vacationId =?`;
    const info = await dal.executeAsync(sql, [
        vacation.description,
        vacation.destination,
        vacation.price,
        vacation.startDate,
        vacation.endDate,
        vacation.imageName,
        vacation.vacationId,
    ])
    return info.affectedRows === 0 ? null : vacation;
}
async function updatePartialVacationAsync(vacation) {
    const vacationToUpdate = await getOneVacationAsync(vacation.vacationId);
    for (const prop in vacation) {
        if (prop in vacationToUpdate && vacation[prop] !== undefined) {
            vacationToUpdate[prop] = vacation[prop];
        }
    }
    return await updateFullVacationAsync(vacationToUpdate);
}

async function deleteVacationAsync(vacationId) {
    const sql = "DELETE FROM vacations WHERE vacationId = ?"
    const info = await dal.executeAsync(sql, [vacationId]);
    return info.affectedRows === 1;
}

module.exports = {
    getAllVacationsAsync,
    getOneVacationAsync,
    AddVacationAsync,
    updateFullVacationAsync,
    updatePartialVacationAsync,
    deleteVacationAsync,
}