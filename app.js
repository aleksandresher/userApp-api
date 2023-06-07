const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DATABASE_URL =
  "mongodb+srv://aleksandreshervashidze2:aleksandre-011@cluster0.e2wh7go.mongodb.net/?retryWrites=true&w=majority";

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

app.use("/users", usersRoutes);
app.use("/", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.json({ message: message, data: data });
});

mongoose
  .connect(DATABASE_URL)
  .then((result) => {
    app.listen(8080);
    console.log("server is running");
  })
  .catch((err) => console.log(err));
