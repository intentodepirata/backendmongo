const mongoose = require("mongoose");

const mongodbConnection = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_HOST);
};

module.exports = mongodbConnection;
