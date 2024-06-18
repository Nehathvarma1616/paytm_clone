const express = require("express");
const Router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const authmiddleware = require("../middleware");

const userSignUpPreCheck = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
// sign up route
Router.post("/signup", async (req, res) => {
  // always make sure in arrow function always req should
  // come first followed by res
  // if res first and req second it donot read data from the user or req.body
  const body = req.body;
  console.log(body.username);
  const { success } = userSignUpPreCheck.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: " Wrong Inputs ",
    });
  }

  const username = await User.findOne({
    username: body.username,
  });

  console.log(username);
  if (username) {
    return res.status(411).json({
      msg: " Email is already taken / Wrong Inputs ",
    });
  }

  const userdb = await User.create(body);
  console.log(userdb);
  // adding some random balance to the user when signup

  await Account.create({
    userId: userdb._id,
    balance: 1 + Math.random() * 10000,
  });
  // creating a token when signup
  console.log("reached here");
  const user_jwt_token = jwt.sign(
    {
      userId: userdb._id,
    },
    JWT_SECRET
  );

  res.json({
    msg: " User Created SuccessFully ",
    token: user_jwt_token,
  });
  console.log("final");
});

const signinPreCheck = zod.object({
  username: zod.string(),
  password: zod.string(),
});

// sign in route
Router.post("/signin", async (req, res) => {
  const body = req.body;
  // zod precheck
  const check = signinPreCheck.safeParse(req.body);
  if (!check) {
    return res.status(403).json({
      msg: " Wrong signin inputs",
    });
  }

  const username = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (username) {
    const token = jwt.sign(
      {
        userId: req._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

// step 8 createing some more routes
// zpd precheck
const updatePreCheck = zod.object({
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

Router.put("/", authmiddleware, async (req, res) => {
  // first Zod verification
  // const body = req.body;
  console.log("stage2");
  const { check } = updatePreCheck.safeParse(req.body);
  if (!check) {
    return res.status(403).json({
      msg: "Error while updating information ",
    });
  }
  // update into database
  await User.updateOne(req.body, {
    id: req.userId,
  });
  // response with a message
  res.status(200).json({
    msg: " Updated successfully ",
  });
});

// get the users in bulk in other words get the users that are present in the database

Router.get("/bulk", async (req, res) => {
  // using find with or will filter multiple things from below firstname and lastname
  // query the filter from the user
  const filter = req.query.flter || "";

  const user = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  // use map to send data back one by one
  res.json({
    users: user.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = Router;
