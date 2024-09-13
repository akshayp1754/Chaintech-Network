const mongoose = require("mongoose");

// Function to connect to the MongoDB database
module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
