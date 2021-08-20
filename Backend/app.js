// getting global config files
global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
// getting environment variables
require('dotenv').config({ path: './.env' });


const port = process.env.PORT || 3001;