// my gloabal answer
let answer;

let playGame = async () => {
  // check if local storage has a word already
  if (localStorage.getItem("answer")) {
    answer = localStorage.getItem("answer");
  } else {
    // if local storage dose not have an answer get one from api
    answer = await getAnswerWord();
    localStorage.setItem("answer", answer);
  }
};

let getAnswerWord = async () => {
  let response = await fetch(
    "https://api.jsonbin.io/v3/b/629f9937402a5b38021f6b38"
  );
  let wordJson = await response.json();
  //   roudn down the random numbe. just incase it has a float
  let randomIndex = Math.floor(Math.random() * wordJson.record.answers.length);
  let answer = wordJson.record.answers[randomIndex];
  return answer;
};

playGame();
