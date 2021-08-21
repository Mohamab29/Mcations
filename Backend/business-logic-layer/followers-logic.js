const dal = require("../data-access-layer/dal");

async function getFollowedVacationsByUserIdAsync(userId) {
    const sql = "SELECT * FROM followers where userId = ?";
    const followers = await dal.executeAsync(sql, [userId]);
    return followers;
}

async function getFollowedVacationsByVacationIdAsync(vacationId) {
    const sql = "SELECT * FROM followers where vacationId = ?";
    const followers = await dal.executeAsync(sql, [vacationId]);
    return followers;
}
async function addFollowerAsync(follower) {
    const sql = "INSERT INTO followers VALUES( ?, ?)";
    await dal.executeAsync(sql, [follower.userId, follower.vacationId]);
    return follower;
}

module.exports = {
    getFollowedVacationsByUserIdAsync,
    getFollowedVacationsByVacationIdAsync,
    addFollowerAsync
}