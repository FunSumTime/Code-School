const express = require("express");

const app = express();

// ./ will get in the same folder
const model = require("./modle");
const { request } = require("http");

// let student = [{ name: "Joe", major: "Art" }];

app.use(express.urlencoded({ extended: true }));

app.get("/students", async (request, response) => {
  // get data from mongodb
  // suppose to stop cors
  let students = await model.Student.find();
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(students);
});

app.post("/students", (request, response) => {
  console.log(request.body);
  const data = request.body;

  //   create a new mongo student usign our model
  let newStudent = new model.Student({
    name: data.name,
    major: data.major,
  });
  newStudent
    .save()
    .then(() => {
      // if the new studnet saved rights
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.status(201).send("Created new student");
    })
    .catch(() => {
      // if something goes wrong when saving a student
      response.status(400).send("Something failed when making a student");
    });
});

// the :id will be able to go to any id
app.delete("/students/:id", (req, res) => {
  console.log("DELETE for single student");
  console.log(req.params.id);
  model.Student.findOneAndDelete({ _id: req.params.id })
    .then((student) => {
      if (student) {
        res.status(200).send("Removed");
      } else {
        console.log("Student not found.");
        res.status(404).send("Student not found.");
      }
    })
    .catch(() => {
      console.log("Bad request (GET by ID).");
      res.status(400).send("Student not found.");
    });
});

app.get("/students/:id", (request, response) => {
  // filter by id
  model.Student.findOne({ _id: request.params.id })
    .then((student) => {
      if (student) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.json(student);
      } else {
        console.log("Student not found");
        response.status(404).send("Student has not been found");
      }
    })
    .catch(() => {
      console.log("Bad request (GET by ID).");
      response.status(400).send("Student not found.");
    });
});

app.put("/students/:id", (request, response) => {
  const updatedStudent = {
    name: request.body.name,
    major: request.body.major,
  };
  //   filter by id
  model.Student.findByIdAndUpdate({ _id: request.params.id }, updatedStudent, {
    new: true,
  }).then((student) => {
    if (student) {
      response.status(204).send("Student updated");
    } else {
      response.status(404).send("Student not found");
    }
  });
});
app.listen(8080, () => {
  console.log("this server is running on http://localhost:8080");
});
