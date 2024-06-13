// my gloabal answer
let answer;
let total_words;
let currentGuess = "";
let guesses = [];
let gameOver = false;
let reset = document.getElementById("reset");

let playGame = async () => {
  // load-save if else
  // check if local storage has a word already
  if (localStorage.getItem("answer")) {
    // parse the JSON string when we load the data (refresh)
    answer = JSON.parse(localStorage.getItem("answer"));
    total_words = JSON.parse(localStorage.getItem("total_words"));
    // this will also get the guesses but it just treats it as an object
    guesses = JSON.parse(localStorage.guesses) || [];
  } else {
    // if local storage dose not have an answer get one from api
    // Make data a json string when we save i think of it like making it so we don't lose anything
    answer = await getAnswerWord();
    localStorage.setItem("answer", JSON.stringify(answer));
    localStorage.setItem("total_words", JSON.stringify(total_words));
  }

  setUpInputs();
  updateGuesses();
};

let getAnswerWord = async () => {
  let response = await fetch(
    "https://api.jsonbin.io/v3/b/629f9937402a5b38021f6b38"
  );
  let wordJson = await response.json();
  //   roudn down the random numbe. just incase it has a float
  let randomIndex = Math.floor(Math.random() * wordJson.record.answers.length);
  // this combines both allowed and answers into one list key word concat
  total_words = wordJson.record.allowed.concat(wordJson.record.answers);
  console.log(total_words);

  let answer = wordJson.record.answers[randomIndex];
  return answer;
};

reset.onclick = () => {
  guesses = [];
  localStorage.clear();
  gameOver = false;
  playGame();
  let message_div = document.getElementById("message");
  message_div.innerHTML = "";
  alert("Please click off of button to continue fun!");
};

// making the divs for the guess boxes
let updateGuesses = () => {
  let geusses_parrent_div = document.getElementById("guesses");
  geusses_parrent_div.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    let g_child_div = document.createElement("div");
    g_child_div.classList.add("guess");
    geusses_parrent_div.appendChild(g_child_div);

    let result;

    if (i < guesses.length) {
      // before we where doing the whole div
      g_child_div.classList.add("guessed");
      result = checkWord(guesses[i]);
    }

    for (let j = 0; j < 5; j++) {
      let letter_div = document.createElement("div");
      letter_div.classList.add("letter");
      // already submited guesses
      if (i < guesses.length) {
        letter_div.innerHTML = guesses[i][j];

        if (result[j] === "green") {
          letter_div.classList.add("match");
        } else if (result[j] === "yellow") {
          letter_div.classList.add("contains");
        }
      }
      // here after the second we set the text now!
      // while we are typing
      if (i === guesses.length && j < currentGuess.length) {
        letter_div.innerHTML = currentGuess[j];
      }
      g_child_div.appendChild(letter_div);
    }
  }
};

let checkWord = (guess) => {
  let result = ["gray", "gray", "gray", "gray", "gray"];
  let answerList = answer.split("");
  // the splitneeded a quatations
  // for debug
  // console.log(answerList);
  // mark stuff as green
  for (let i = 0; i < 5; i++) {
    if (answerList[i] === guess[i]) {
      // Ex to make sure we don't use it again
      answerList[i] = null;
      result[i] = "green";
    }
  }
  // mark yellow if the letter is in the wrong place but in the word
  for (let i = 0; i < 5; i++) {
    // in java script indexof will see if that things in the list and return the index to you
    // it needs to be indexOf
    let index = answerList.indexOf(guess[i]);
    if (index >= 0 && result[i] === "gray") {
      answerList[i] = null;
      result[i] = "yellow";
    }
  }
  return result;
};

let submitGuess = () => {
  let message_div = document.getElementById("message");
  if (currentGuess.length < 5) {
    message_div.innerHTML = "Live, laugh, love as long as it's 5 letters";
  } else if (!total_words.includes(currentGuess)) {
    message_div.innerHTML =
      "You Think that is a real word?" + " " + "&#129300;";
  } else if (guesses.length < 6) {
    guesses.push(currentGuess);
    localStorage.setItem("guesses", JSON.stringify(guesses));
    if (currentGuess === answer) {
      message_div.innerHTML = "Yippi!";
      while (guesses.length < 6) {
        guesses.push(currentGuess);
      }
      gameOver = true;
    } else if (guesses.length === 6) {
      message_div.innerHTML = "Womp Womp :(";
      gameOver = true;
    }
  }
};

let setUpInputs = () => {
  document.onkeydown = (event) => {
    if (!gameOver) {
      // this will tell if the event is in the alapbet
      if ("a" <= event.key && event.key <= "z" && currentGuess.length < 5) {
        currentGuess += event.key;
        console.log(currentGuess);
        // if the key is backspace and the guess is greater than 0
      } else if (event.key === "Backspace" && currentGuess.length > 0) {
        // this will get rid of the last letter
        currentGuess = currentGuess.slice(0, -1);
        console.log(currentGuess);
      } else if (event.key === "Enter") {
        submitGuess();
        currentGuess = "";
      }
      updateGuesses();
    } else {
      guesses = [];
      localStorage.clear();
      gameOver = false;
      playGame();
      let message_div = document.getElementById("message");
      message_div.innerHTML = "";
    }
  };
};

playGame();
