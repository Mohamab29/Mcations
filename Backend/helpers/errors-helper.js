function internalServerError(response, error) {
    // return errors with status 500 if we are in development 
    if(global.config.isDevelopment) {
        response.status(500).send(error.message);
        return;
    }

    response.status(500).send("please try again later.");
}

module.exports = {
    internalServerError
};