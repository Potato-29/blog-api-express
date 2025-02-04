const mongoose = require("mongoose");

async function connectDB() {
  const db = await mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "blog-site",
    })
    .then(() => {
      console.log("Db Connected!");
    })
    .catch((err) => {
      console.error("Failed to connect db!", err);
    });
}

module.exports = connectDB;
