const Joi = require("joi");

class Credentials {
    constructor(credentials) {
        this.username = credentials.username;
        this.password = credentials.password;
    }
    validateLogin() {
        const validationSchema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
        // abortEarly: false --> return all errors and not only the first one
        const result = validationSchema.validate(this, { abortEarly: false });
        // If there is an error - return it as an array, otherwise return null
        return result.error?.details.map(err => err.message);
    }
}
module.exports = Credentials;