const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid");

async function isUniqueUsername(username) {
    const sql = "SELECT * FROM users WHERE username = ?";
    const users = await dal.executeAsync(sql, [username]);
    return users.length === 0 ? true : false;
}

async function registerAsync(user) {
    user.password = cryptoHelper.hash(user.password);
    user.userId = uuid.v4();
    const sql = "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)";
    if (!user.isAdmin) {
        // checking if we entered the admin flag 
        // if we entered false or didn't then we enter false to be sure it stay's that way   
        user.isAdmin = 0;
    }
    const userValues = [
        user.userId,
        user.firstName,
        user.lastName,
        user.username,
        user.password,
        user.isAdmin
    ];
    await dal.executeAsync(sql, userValues);
    delete user.password; // Delete password before returning to frontend.
    user.token = cryptoHelper.getNewToken(user);
    return user;
}

async function loginAsync(credentials) {
    credentials.password = cryptoHelper.hash(credentials.password);
    const sql = "SELECT userId, firstName, lastName, username, isAdmin FROM users WHERE username = ? AND password = ?";
    const users = await dal.executeAsync(sql, [credentials.username, credentials.password]);
    if (users.length === 0) return null;
    const user = users[0]; // because we get an array and in it is the user object 
    user.token = cryptoHelper.getNewToken(user);
    return user;
}

module.exports = {
    registerAsync,
    loginAsync,
    isUniqueUsername
};