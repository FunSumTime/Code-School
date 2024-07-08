const express = require("express");
const cors = require("cors");
const model = require("./model");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret:
      "jkgajfidpafjkdla;jreihvnaejklfjdaipeipdnkavajdfiejaifdkvbaghifiejkl;",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(express.static("public"));

// it kinda shortens code and makes sure that the person is logged in
// purpose of this middleware is to chekc if a request has a session and
//  that session has a userID field that connnects to a user in our database
async function AuthMiddleware(request, response, next) {
  // step one check if they have a session
  if (request.session && request.session.userID) {
    //  step two check if that session user id connects to a user in our database
    let user = await model.User.findOne({ _id: request.session.userID });
    if (!user) {
      return response.status(401).send("unauthenticated");
    }
    // if they are autheticated just pass them to the endpoint
    request.user = user;
    next();
  } else {
    return response.status(401).send("unauthenticated");
  }
}

app.get("/session", AuthMiddleware, (request, response) => {
  console.log(request.user);
  response.send(request.session);
});

app.get("/users", async function (request, response) {
  try {
    let users = await model.User.find();
    response.send(users);
    console.log(users);
  } catch (error) {
    console.log(error);
    response.status(404).send("User not Found");
  }
});

app.post("/users", async function (request, response) {
  try {
    let newUser = await new model.User({
      email: request.body.email,
      name: request.body.name,
    });
    await newUser.setPassword(request.body.password);

    const error = await newUser.validateSync();

    if (error) {
      response.status(422).send(error);
      return;
    }

    await newUser.save();
    response.status(201).send("User created");
  } catch (error) {
    console.log(error);
    response.status(404).send("Could not create User");
  }
});

app.post("/session", async (request, response) => {
  try {
    // step 1 check if email is in data base
    let user = await model.User.findOne({ email: request.body.email });
    // step two check if its emtpy if so then user is not in database
    if (!user) {
      return response.status(404).send("Authentication failure");
    }
    // step three check password
    let isGoodPassword = await user.verifyPassword(request.body.password);
    if (!isGoodPassword) {
      return response.status(401).send("Authentication failure");
    }

    // now we set up the cookie
    request.session.userID = user._id;
    request.session.name = user.name;

    response.status(201).send(request.session);
  } catch (error) {
    response.status(500);
    console.log(error);
  }
});

app.get("/quizzes", async function (req, res) {
  try {
    let quizzes = await model.Quiz.find().populate("owner", "-password");
    if (!quizzes) {
      res.status(404).send("Quizzes Not Found");
      return;
    }
    res.json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(404).send("Quizzes Not Found");
  }
});

app.get("/quizzes/:quizID", async function (req, res) {
  try {
    console.log(req.params.quizID);
    let quiz = await model.Quiz.find({ _id: req.params.quizID }).populate(
      "owner",
      "-password"
    );
    console.log(quiz);
    if (!quiz) {
      console.log("Quiz not found.");
      res.status(404).send("Quiz not found.");
      return;
    }

    res.json(quiz);
  } catch (error) {
    console.log(error);
    console.log("Bad request (GET quiz).");
    res.status(400).send("Quiz not found.");
  }
});

app.post("/quizzes", async function (req, res) {
  try {
    let newQuiz = await new model.Quiz({
      title: req.body.title,
      owner: req.session.userID,
      description: req.body.description,
      questions: req.body.questions,
    });
    const error = await newQuiz.validateSync();
    if (error) {
      res.status(422).send(error);
      return;
    }
    await newQuiz.save();
    res.status(201).send("quiz Created");
  } catch (error) {
    console.log(error);
    console.log("Bad post");
    res.status(404).send("coudl not make quiz");
  }
});

// put and delete for quiz a single quiz hint id
//  use the middle ware
// only the owner is allowed to put and delete quiz

app.put("/quizzes/:id", AuthMiddleware, async function (request, response) {
  try {
    let quiz = await model.Quiz.findOne({ _id: request.params.id });
    if (!quiz) {
      return response.status(404).send("Could not find quiz");
    }
    // console.log("bruuhhhhhhh");
    // console.log(request.user._id);
    // console.log("BOOOooooooo");
    // console.log(quiz);
    // console.log(quiz.owner);

    // there memory wasnt the same
    if (request.user._id.toString() === quiz.owner.toString()) {
      quiz.title = request.body.title;
      quiz.owner = request.session.userID;
      quiz.description = request.body.description;
      quiz.questions = request.body.questions;

      const error = await quiz.validateSync();
      if (error) {
        response.status(422).send(error);
        return;
      }
      await quiz.save();
      response.status(204).send("Updated");
    } else {
      response.status(400).send("You Can't do that");
    }
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic error");
  }
});

app.delete("/quizzes/:id", AuthMiddleware, async function (request, response) {
  try {
    // let oneToDelte = await model.Quiz.findOne({ _id: request.params.id });
    // if (request.user._id.toString() === oneToDelte.owner.toString()) {
    let isDeleted = await model.Quiz.findOneAndDelete({
      _id: request.params.id,
      owner: request.user._id,
    });
    if (!isDeleted) {
      return request.status(404).send("Could not find that");
    }
    response.status(204).send("Deleted");
  } catch (error) {
    console.log(error);
    response.status(404).send("generic error");
  }
});

app.delete("/session", function (req, res) {
  req.session.userID = undefined;
  req.session.name = undefined;

  res.status(204).send();
});

app.listen(8080, function () {
  console.log("server is running on http://localhost:8080...");
});
