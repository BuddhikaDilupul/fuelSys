const app = require("./src/services/express");
const mongooseConnection = require("./src/services/mongoose");
app.start();
mongooseConnection.start();
