const mongoose = require("mongoose");
const { number } = require("zod");

mongoose.connect("mongodb+srv://admin:1234@100x.mgb9fzc.mongodb.net/paytm");

const Schema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  balance: Number,
});

const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", Schema);

module.exports = {
  User,
  Account,
};
