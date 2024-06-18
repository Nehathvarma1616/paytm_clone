const express = require("express");
const Router = express.Router();
const User = require("./users");
const Account = require("./account")

Router.use("/user", User);
Router.use("/account",Account);

module.exports = Router;
