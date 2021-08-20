const Joi = require("joi");

class User {
    constructor(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    validateRegister() {
        const validationSchema = Joi.object({
            userId: Joi.string().optional().guid({ version: 'uuidv4' }).min(36).max(36),
            firstName: Joi.string().required().min(2).max(30).regex(/^[a-zA-Z]{2,30}$/),
            lastName: Joi.string().required().min(2).max(40).regex(/^[a-zA-Z]{2,40}$/),
            username: Joi.string().required().min(2).max(30).regex(/^[0-9a-zA-Z]{2,30}$/),
            password: Joi.string().required().min(8).max(30).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/),
            isAdmin: Joi.number().optional().positive().allow(1,0).only(),
        });
        // abortEarly: false --> return all errors and not only the first one
        const result = validationSchema.validate(this, { abortEarly: false });
        // If there is an error - return it as an array, otherwise return null
        return result.error?.details.map(err => err.message);
    }
}

module.exports = User;