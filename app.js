const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
///sds

app.use("/users", usersRoutes);
app.use("/", authRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) => {
    app.listen(process.env.DATABASE_URL);
    console.log("server is running");
  })
  .catch((err) => console.log(err));
