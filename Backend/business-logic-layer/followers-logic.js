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
async function deleteFollowerAsync(follower) {
    const sql = "DELETE FROM followers WHERE vacationId = ? and userId = ?";
    const info = await dal.executeAsync(sql, [follower.vacationId, follower.userId]);
    return info.affectedRows === 1;
}

module.exports = {
    getFollowedVacationsByUserIdAsync,
    getFollowedVacationsByVacationIdAsync,
    addFollowerAsync,
    deleteFollowerAsync
}