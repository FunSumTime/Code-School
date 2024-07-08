const express = require("express");
const cors = require("cors");
const model = require("./model");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "jaojfdkanfeipohavijandklfadjdjaidonkellajhfdiapfejk",
    saveUninitialized: true,
    resave: false,
  })
);
// serving our files
app.use(express.static("public"));

// employes
app.get("/employees", async function (request, response) {
  try {
    let employees = await model.Employee.find();
    response.send(employees);
    console.log(employees);
  } catch (error) {
    console.log(error);
    response.status(404).send("Could not find employees");
  }
});

app.post("/employees", async function (request, response) {
  try {
    let newEmployee = await new model.Employee({
      email: request.body.email,
      name: request.body.name,
      jobTitle: request.body.jobTitle,
      pay: request.body.pay,
    });
    const error = await newEmployee.validateSync();
    if (error) {
      response.status(422).send(error);
    }

    await newEmployee.save();
    response.status(201).send("Employee created");
  } catch (error) {
    console.log(error);
    response.status(404).send("Could not make employee");
  }
});
// company
app.get("/companies", async function (request, response) {
  try {
    let companies = await model.Company.find()
      .populate("employees")
      .populate("owner");
    if (!companies) {
      response.status(404).send("Could not find companyes");
      return;
    }
    response.json(companies);
  } catch (error) {
    console.log(error);
    response.status(404).send("Something went wrong");
  }
});
app.post("/companies", async function (request, response) {
  try {
    let newCompanie = await new model.Company({
      name: request.body.name,
      employees: request.body.employees,
      owner: request.body.owner,
    });

    const error = await newCompanie.validateSync();
    if (error) {
      response.status(422).send(error);
      return;
    }
    await newCompanie.save();
    response.status(201).send("Companie created");
  } catch (error) {
    console.log(error);
    response.status(404).send("Bad compaine");
  }
});

// employes
app.put("/employees/:id", async function (request, response) {
  try {
    let employee = await model.Employee.findOne({
      _id: request.params.id,
    });
    if (!employee) {
      response.status(404).send("bruh he dont work here");
      return;
    }
    employee.email = request.body.email;
    employee.name = request.body.name;
    employee.jobTitle = request.body.jobTitle;
    employee.pay = request.body.pay;

    const error = await employee.validateSync();
    if (error) {
      response.status(422).send(error);
      return;
    }
    await employee.save();
    response.status(204).send("Updated");
  } catch (error) {
    console.log(error);
    response.status(404).send("coudl not find that boi");
  }
});

app.listen(8080, function () {
  console.log("server is running on http://localhost:8080...");
});
