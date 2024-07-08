const http = require("http");
const queryString = require("querystring");
const server = http.createServer();
// let song = {
//   name: "",
//   song_leng: "",
// };

let legal_songs = [{ name: "hello", length: "5min" }];

server.on("request", (request, response) => {
  // if they are not asking for a legal song
  // send a 404
  if (request.url != "/legal-songs") {
    response.statusCode = 404;
    response.write("Whatever you are looking for, it's not here.");
    response.end();
    return;
  }
  switch (request.method) {
    // get all legal songs, send all of then as JSON data
    case "GET":
      response.statusCode = 200;
      //   set header so client know's body is JSON
      response.setHeader("Content-Type", "application/json");
      //   set up body to be JSON
      response.write(JSON.stringify(legal_songs));
      //   send response
      response.end();
      break;
    case "POST":
      response.statusCode = 201;
      let chunks = [];
      request.on("data", (chunk) => {
        chunks += chunk.toString();
      });
      request.on("end", () => {
        console.log(chunks);
        let parsedData = queryString.parse(chunks);
        console.log(parsedData);
        legal_songs.push(parsedData);
        response.statusCode = 201;
        response.write("created");
        response.end();
      });
      break;
    default:
      response.statusCode = 404;
      response.write("Not valid method for legal-songs");
      response.end();
      break;
  }
  // give a status code

  console.log("got a request");
});

server.listen(8080, () => {
  console.log("server is running on http://localhost:8080");
});
