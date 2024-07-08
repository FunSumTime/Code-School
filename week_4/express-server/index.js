const express = require("express");
const app = express();

let legal_songs = [{ name: "Everyday", length: 220 }];
// use MiddleWare
// take our body and transform it into java script object
// tells our express server to use this middle ware
app.use(express.urlencoded({ extended: true }));

// GET for legal songs
app.get("/legal-songs", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(legal_songs);
});

// post for legal songs
app.post("/legal-songs", function (request, response) {
  console.log(request.body);
  const data = request.body;

  let newSong = {
    name: data.name,
    length: data.length,
  };
  legal_songs.push(newSong);
  response.status(201).send("Created Legal Song");
});
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
