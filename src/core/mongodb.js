const mongoose = require("mongoose")

const { MONGODB_URL } = require("../env")

mongoose.connect(MONGODB_URL)

module.exports = mongoose
