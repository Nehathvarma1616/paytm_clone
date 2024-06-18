const express = require("express");
const authmiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const Router = express.Router();

Router.get("/balance", authmiddleware, async (req, res) => {
  userId = req.userId;
  // console.log(userId);
  const userAccount = await Account.findOne({
    userId: userId,
  });
  // console.log(userAccount);
  res.status(200).json({
    balance: userAccount.balance,
  });
});

Router.post("/transfer", authmiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // find the user
  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: " Insufficient balance ",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    session.abortTransaction();
    return res.status(400).json({
      message: " Invalid Account ",
    });
  }

  // perform transaction

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  // commit transaction
  await session.commitTransaction();
  res.json({
    message: " Tranfer successfull ",
  });
});

module.exports = Router;
