// player = 1 is player 'x' and player = 0 is player "o"
// lets start with x turns first
let player = 1;
let gameOver = false;

let turn_span = document.getElementById("turn");

let winner_div = document.getElementById("winner");

let tiles = document.querySelectorAll(".tile");

let bye = document.getElementById("bye");

let iswinner = (player) => {
  let winning_classes = [
    "row1",
    "row2",
    "row3",
    "col1",
    "col2",
    "col3",
    "diag1",
    "diag2",
  ];
  //   we had a problem with the scope and we were not returing in the right postion
  let winner = false;
  winning_classes.forEach((win_class) => {
    let selector = "." + player + "." + win_class;
    let check = document.querySelectorAll(selector);

    if (check.length === 3) {
      winner = true;
    }
  });
  return winner;
};

tiles.forEach((tile) => {
  tile.onclick = () => {
    console.log(gameOver);
    if (tile.innerHTML === "" && !gameOver) {
      if (player === 1) {
        tile.innerHTML = "X";
        tile.classList.add("x");

        if (iswinner("x")) {
          gameOver = true;
          winner_div.innerHTML = "X Wins!";
          winner_div.classList.add("x");
          turn_span.innerHTML = "";
          bye.innerHTML = "Thanks for playing!";
        }
        tile.style.cursor = "not-allowed";
        player = 0;
        turn_span.innerHTML = "O";
      } else {
        tile.innerHTML = "O";
        tile.classList.add("o");

        if (iswinner("o")) {
          gameOver = true;
          winner_div.innerHTML = "O Wins!";
          winner_div.classList.add("o");
          turn_span.innerHTML = "";
          bye.innerHTML = "Thanks for playing!";
        }

        tile.style.cursor = "not-allowed";

        player = 1;
        turn_span.innerHTML = "X";
      }
    }
  };
});
