const mongoose = require("mongoose");

async function connectDB() {
  const db = await mongoose
    .connect(
      "mongodb+srv://testuser29:Test%40123@testcluster0.ppxbwit.mongodb.net/?retryWrites=true&w=majority&appName=testCluster0",
      {
        dbName: "blog-site",
      }
    )
    .then(() => {
      console.log("Db Connected!");
    })
    .catch((err) => {
      console.error("Failed to connect db!", err);
    });
}

module.exports = connectDB;
