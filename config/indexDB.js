const config = require("../config/index");
const mongoose = require("mongoose");

mongoose.connect(config.dbSettings.url);

module.exports = mongoose;
