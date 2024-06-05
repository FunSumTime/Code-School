// BUG 0 just to catch you off guard :)
let question = document.getElementById("question-h3");
let currentQuestionIndex = 0;
let answers_select = document.getElementById("answers");
let submit_button = document.getElementById("submit-button");
const questions = [
  {
    question: "What year did Linux come out?",
    answers: ["1999", "1971", "2024"],
    good_answer: "1971",
  },
  {
    question: "What does BASH stand for?",
    answers: [
      "Bourne-again SHell",
      "Bad Angry Simple Hanks",
      "Bill Ate Spaghetti",
    ],
    good_answer: "Bourne-again SHell",
  },
  {
    question: "What does VIM stand for?",
    answers: ["Vim", "Virtual Is Mode", "VI Improved"],
    good_answer: "VI Improved",
  },
  {
    question: "Is Python compiled?",
    answers: ["Yes", "No", "Maybe So"],
    good_answer: "No",
  },
  {
    question: "What's the best editor?",
    answers: ["VIM", "VSCode", "Emacs"],
    good_answer: "VIM",
  },
];

let display_question = () => {
  let curr_question = questions[currentQuestionIndex];
  answers_select.innerHTML = "";

  // BUG  - hint curr_question is some object. We want a field from that object
  question.innerHTML = currentQuestionIndex + 1 + ") " + curr_question.question;

  // loop through answers and make a option for each one
  // BUG answers doesn't exist by itself. It's a field of what object?
  curr_question.answers.forEach((answer) => {
    // BUG  - hint what should we be putting into a select element?
    let newOption = document.createElement("option");
    newOption.innerHTML = answer;

    // BUG  How do we add a child to a HTML element?
    answers_select.appendChild(newOption);
  });
};

submit_button.onclick = () => {
  // Fun We should have code right here to see if have went through every
  // question, if so then hide the div with the id answer-area
  // to do this you have to query it from the DOM and then set it's
  // style.display = "none"
  //
  // And right after give a nice message with the question html by setting it's
  // innerHTML to something like "You won!"

  // only move on to next question if you were right
  let curr_question = questions[currentQuestionIndex];
  if (answers_select.value === curr_question.good_answer) {
    if (currentQuestionIndex === questions.length - 1) {
      let div = document.querySelectorAll("answer-area");
      div.display = "none";
      question.innerHTML = "Good Job";
    } else {
      currentQuestionIndex++;
      // BUG - we need to be doing something to move on to the next question
      display_question();
    }
  } else {
    alert("try again");
  }

  // FUN add a else that alerts or does something if you get the wrong answer
};

display_question();
