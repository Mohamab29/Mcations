const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hash(plainText) {
    // supposedly a password as plain text 
    if (!plainText) return null;

    // Hashing with salt: 
    const salt = process.env.SALT;
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");

}

function getNewToken(user) {
    //adding a token to user object
    const payload = { user };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "20m" });
}

module.exports = {
    hash,
    getNewToken
};
