const express = require("express");

const app = express();

let good_books = [{ name: "Michale vey", length: "500pgs" }];

app.use(express.urlencoded({ extended: true }));

// the first parameter is the section for the page
//  the second parameter is what the server will do, response is the server and the request is the user
app.get("/good-books", (request, response) => {
  response.json(good_books);
});

app.post("/good-books", (request, response) => {
  console.log(request.body);
  //   getting the info
  const data = request.body;
  let newBook = {
    name: data.name,
    length: data.length,
  };
  good_books.push(newBook);
  response.status(201).send("Created New good Book");
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
