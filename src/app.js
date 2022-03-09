const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const passport = require("./core/passport");
const routes = require("./core/router");

//create express
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
//routes
app.use("/v1/api", routes);

module.exports = app;
