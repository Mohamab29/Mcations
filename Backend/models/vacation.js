const Joi = require('joi');

class Vacation {

    constructor(vacation) {
        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.price = vacation.price;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.imageName = vacation.imageName;
    }

    validatePost() {
        const currentDate = new Date().toLocaleDateString();
        const validationSchema = Joi.object({
            vacationId: Joi.forbidden(),
            description: Joi.string().required().min(10).max(1500),
            destination: Joi.string().required().min(4).max(60),
            price: Joi.number().required().precision(2).positive().max(10000),
            startDate: Joi.date().iso().required().greater(currentDate),
            endDate: Joi.date().iso().required().greater(Joi.ref('startDate')),
            imageName: Joi.string().required().regex(/(.jpeg|.jpg|.png)$/), // must end with these extensions
        });
        // abortEarly: false --> return all errors and not only the first one
        const result = validationSchema.validate(this, { abortEarly: false });
        // If there is an error - return it as an array, otherwise return null
        return result.error?.details.map(err => err.message);
    }
    validatePut() {
        const currentDate = new Date().toLocaleDateString();
        const validationSchema = Joi.object({
            vacationId: Joi.string().required().guid({ version: 'uuidv4' }).min(36).max(36),
            description: Joi.string().required().min(10).max(1500),
            destination: Joi.string().required().min(4).max(60),
            price: Joi.number().required().precision(2).positive().max(10000),
            startDate: Joi.date().iso().required().greater(currentDate),
            endDate: Joi.date().iso().required().greater(Joi.ref('startDate')),
            imageName: Joi.string().required().regex(/(.jpeg|.jpg|.png)$/), // must end with these extensions
        });
        // abortEarly: false --> return all errors and not only the first one
        const result = validationSchema.validate(this, { abortEarly: false });
        // If there is an error - return it as an array, otherwise return null
        return result.error?.details.map(err => err.message);
    }
    validatePatch() {
        const currentDate = new Date().toLocaleDateString();
        const validationSchema = Joi.object({
            vacationId: Joi.string().required().guid({ version: 'uuidv4' }).min(36).max(36),
            description: Joi.string().optional().min(10).max(1500),
            destination: Joi.string().optional().min(4).max(60),
            price: Joi.number().optional().precision(2).positive().max(10000),
            startDate: Joi.date().iso().optional().greater(currentDate),
            endDate: Joi.date().iso().optional().greater(Joi.ref('startDate')),
            imageName: Joi.string().optional().regex(/(.jpeg|.jpg|.png)$/), // must end with these extensions
        });
        // abortEarly: false --> return all errors and not only the first one
        const result = validationSchema.validate(this, { abortEarly: false });
        // If there is an error - return it as an array, otherwise return null
        return result.error?.details.map(err => err.message);
    }


}

module.exports = Vacation;
