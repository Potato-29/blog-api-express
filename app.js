const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config();

// import API routes
const userRouter = require("./src/routes/user.router");
const connectDB = require("./src/configs/database");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
const port = process.env.PORT;

// Allocate API routes
app.use("/api/user", userRouter);
app.use(errorHandler);

connectDB();

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
