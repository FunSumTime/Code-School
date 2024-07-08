const express = require("express");
const model = require("./modle");
const { Student } = require("../mongodb/modle");
const modle = require("./modle");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/expenses", async (request, response) => {
  try {
    let expenses = await model.Expense.find();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.json(expenses);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.post("/expenses", async (request, response) => {
  try {
    console.log(request.body);
    const data = request.body;
    let newExpense = new model.Expense({
      category: data.category,
      amount: data.amount,
      description: data.description,
    });
    // its going to do checks like is data.amount a number type and if it is then error will exist
    let error = newExpense.validateSync();
    if (error) {
      response.status(400).json(error);
      return;
    }

    await newExpense.save();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(201).json(newExpense);
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic error");
  }
});

app.put("/expenses/:id", async (request, response) => {
  try {
    const updatedReq = {
      category: request.body.category,
      amount: request.body.amount,
      description: request.body.description,
    };

    let putExpense = model.Expense.findByIdAndUpdate(
      { _id: request.params.id },
      updatedReq,
      { new: true }
    );
    if (!putExpense) {
      response.status(404).send("Can't update that :|");
      return;
    }
    response.status(204).json(updatedReq);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/expenses/:id", async (request, response) => {
  try {
    console.log("DELETE for single student");
    console.log(request.params.id);
    let isDeleted = await modle.Expense.findByIdAndDelete({
      _id: request.params.id,
    });
    if (!isDeleted) {
      response.status(404).send("could not find expense");
      return;
    }
    response.status(204).send("Expense deleted");
  } catch (error) {
    console.log(error);
    response.status(400).send("Generic Error");
  }
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
