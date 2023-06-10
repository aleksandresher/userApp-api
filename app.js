const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://user-test-app.onrender.com");
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
  res.setHeader("Access-Control-Allow-Origin", "https://user-test-app.onrender.com");
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

// mongoose
//   .connect(process.env.DATABASE_URL)
//   .then((result) => {
//     app.listen(8080);
//     console.log("server is running");
//   })
//   .catch((err) => console.log(err));

mongoose
  .connect(process.env.DATABASE_URL, {
    user: process.env.DATABASE_USERNAME,
    pass: process.env.DATABASE_PASSWORD,
    authSource: "admin",
  })
  .then((result) => {
    app.listen(8080);
    console.log("Server is running");
  })
  .catch((err) => console.log(err));
