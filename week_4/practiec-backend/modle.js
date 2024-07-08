const mongoose = require("mongoose");

mongoose.connect(process.env.DBPASSWORD);

const ExpenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      requried: [true, "Expense needs to have a category"],
    },
    amount: {
      type: Number,
      requried: [true, "Expense needs to have an amount"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// gives wehn it happend (Timestamps)

const Expense = mongoose.model("Schema", ExpenseSchema);

module.exports = {
  Expense: Expense,
};
