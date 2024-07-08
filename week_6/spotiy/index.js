const express = require("express");
const cors = require("cors");
const model = require("./model");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(express.json());
// artist
app.get("/artists", async function (request, response) {
  try {
    let artist = await model.Artist.find();
    response.send(artist);
    console.log(artist);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});
app.post("/artists", async function (request, response) {
  try {
    let newAritst = await new model.Artist({
      name: request.body.name,
    });
    const error = await newAritst.validateSync();
    if (error) {
      response.status(404).send(error);
      return;
    }
    await newAritst.save();
  } catch (error) {
    console.log(error);
    response.status(404).send("generic error");
  }
});

// Songs
app.get;
app.post;

// playlist
app.get;
app.post;

app.listen(8080, function () {
  console.log("Server is running on http//localhost:8080");
});
