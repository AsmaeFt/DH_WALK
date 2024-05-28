const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const data = require("./routes/post_DATA");
const app = express();

//MidleWare
app.use(cors());
app.use(bodyparser.json());

//Routes
app.use("/api", data);

//MongoDB connection

const DBURI = "mongodb://localhost:27017/DH_WALK";
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("Data Connected...");
  })
  .catch((err) => console.error("Database connection error :", err));

//Global Error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

//Server

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App running on port :${PORT}`);
});
