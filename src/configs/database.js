const mongoose = require("mongoose");

async function connectDB() {
  let testMode = process.env.TEST_MODE === "true";
  const db = await mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: testMode ? "blog-site-test" : "blog-site",
    })
    .then(() => {
      console.log("Db Connected!", testMode);
    })
    .catch((err) => {
      console.error("Failed to connect db!", err);
    });
}

module.exports = connectDB;
