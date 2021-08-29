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
    const followed = await getFollowedVacationsByUserIdAsync(follower.userId);
    if (followed.length) {
        // checking if a person already followed a vacation if yes then we return empty object
        for (const follow of followed) {
            if (follow.vacationId === follower.vacationId) {
                return false;
            }
        }
    }
    const sql = "INSERT INTO followers VALUES( ?, ?)";
    await dal.executeAsync(sql, [follower.userId, follower.vacationId]);
    return follower;
}
async function deleteFollowerAsync(follower) {
    const sql = "DELETE FROM followers WHERE vacationId = ? and userId = ?";
    const info = await dal.executeAsync(sql, [follower.vacationId, follower.userId]);
    return info.affectedRows === 1;
}

async function getFollowersNumber() {
    // In this function we are gonna use a SQL query to get the number of followers for each
    // vacation and it's destination 
    const sql = `SELECT F.vacationId,
    COUNT( F.vacationId) AS followerNumber,V.destination 
    FROM followers AS F 
    JOIN vacations AS V 
    ON F.vacationId = V.vacationId 
    GROUP BY vacationId;`;
    const followers = await dal.executeAsync(sql);
    return followers;

}

module.exports = {
    getFollowedVacationsByUserIdAsync,
    getFollowedVacationsByVacationIdAsync,
    addFollowerAsync,
    deleteFollowerAsync,
    getFollowersNumber,
}