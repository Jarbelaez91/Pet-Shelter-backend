require("dotenv").config();

require("./config/connection");

require("./config/authStrategy");

const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const helmet = require("helmet");

const path = require("node:path");

const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

const petRoutes = require("./routes/petRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("combined"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")))




app.get("/", (request, response, next) => {
  response.status(200).json({
    success: { message: "this is the main page" },
    statusCode: 200,
  });
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/pets", petRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  let condition = error.code === 11000;

  console.log(condition);

  if (condition) {
    return res.status(error.status || 400).json({
      error: { message: "Error detected!!!" },
      statusCode: error.status || 400,
    });
  } else {
    console.log("We passed the error handling middleware, you're good to go");
  }

  return res.status(error.status || 500).json({
    error: { message: error.message || "Internal server error, oh no!" },
    statusCode: error.status || 500,
  });
});

app.listen(PORT, () => {
  console.log(`this server is listening on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}/`);
});

module.exports = app;
