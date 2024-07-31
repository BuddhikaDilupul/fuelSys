const mongoose = require("mongoose");
const config = require("../config");

exports.start = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB!!!");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};