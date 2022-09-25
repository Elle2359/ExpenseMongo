const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//user model
const user_model = new Schema({
  email: String,
  password: String,
});

//transactions
const Expense_model = new Schema({
  type: String,
  category: String,
  amount: Number,
  date: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Users = mongoose.model("User", user_model);
const Expenses = mongoose.model("Expenses", Expense_model);

exports.default = Expenses;
module.exports = {
  Users,
  Expenses,
};
