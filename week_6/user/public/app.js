const URL = "http://localhost:8080";

Vue.createApp({
  data() {
    return {
      currentPage: "loading",
      user: {
        name: "",
        email: "",
        password: "",
      },
      currentUser: null,
      newQuiz: {
        title: "",
        description: "",
        questions: [],
      },
      newQuestions: [
        {
          questionText: "",
          possibleChoices: [{ answerText: "", isCorrect: false }],
        },
      ],
      quizzes: [],
      currentQuiz: null,
      currentQuizQuestion: 0,
      currentQuizQuestionAnswered: false,
      currentQuizTotalScore: 0,
      editingQuiz: false,
    };
  },
  methods: {
    setPage: function (page) {
      this.currentPage = page;
    },
    registerUser: async function () {
      // telling them what we are doing
      // this uses json we will use headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.user),
      };
      //   when using json no need to use encoded data

      let response = await fetch(`${URL}/users`, requestOptions);
      if (response.status === 201) {
        console.log("successfully registerd");
        this.loginUser();
      } else {
        console.log("Failed to register");
      }
    },
    loginUser: async function () {
      let myHeaders = new Headers();
      // tells server hey im sending you json
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.user),
      };
      let response = await fetch(`${URL}/session`, requestOptions);
      let data = await response.json();
      if (response.status === 201) {
        console.log("Successfully Logged in");
        this.currentUser = data;
        this.user = {
          name: "",
          email: "",
          password: "",
        };
        this.getQuizes();
        this.currentPage = "quizzes";
      } else {
        console.log("Failed to login");
      }
    },
    getSession: async function () {
      let response = await fetch(`${URL}/session`);
      if (response.status === 200) {
        let data = await response.json();
        this.currentUser = data;
        this.currentPage = "quizzes";
      } else {
        this.currentPage = "login";
      }
      this.getQuizes();
    },
    deleteSession: async function () {
      let requestOptions = {
        method: "DELETE",
      };

      let response = await fetch(`${URL}/session`, requestOptions);
      if (response.status === 204) {
        this.currentPage = "login";
        this.currentUser = null;
      }
    },
    addQuestion: function () {
      // let them add a question
      this.newQuestions.push({
        questionText: "",
        possibleChoices: [{ answerText: "", isCorrect: false }],
      });
    },
    addAnswer: function (index) {
      // letting the user add a answer when making the quiz
      this.newQuestions[index].possibleChoices.push({
        answerText: "",
        isCorrect: false,
      });
    },
    createQuiz: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // putting the qeustions into the whole thing
      this.newQuiz.questions = this.newQuestions;
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.newQuiz),
      };
      let response = await fetch(`${URL}/quizzes`, requestOptions);
      if (response.status === 201) {
        this.getQuizes();
        this.clearQuiz();
        this.currentPage = "quizzes";
        console.log("Succesfully created quiz");
      } else {
        console.log("Failed to create quiz");
      }
    },
    getQuizes: async function () {
      let response = await fetch(`${URL}/quizzes`);
      let data = await response.json();
      this.quizzes = data;
      console.log(data);
    },
    clearQuiz: function () {
      this.newQuiz = {
        title: "",
        description: "",
        questions: [],
      };
      this.newQuestions = [
        {
          questionText: "",
          possibleChoices: [{ answerText: "", isCorrect: false }],
        },
      ];
      this.currentQuiz = {};
      this.currentQuizQuestion = 0;
      this.currentQuizQuestionAnswered = false;
      this.currentQuizTotalScore = 0;
      this.editingQuiz = false;
    },
    deleteQuiz: async function (quizID) {
      let requestOptions = {
        method: "DELETE",
      };
      let response = await fetch(`${URL}/quizzes/${quizID}`, requestOptions);
      if (response.status === 204) {
        this.getQuizes();
        console.log("quiz deleted");
      } else {
        console.log("failed to delete");
      }
    },
    startQuiz: async function (quizID) {
      let response = await fetch(`${URL}/quizzes/${quizID}`);
      let data = await response.json();
      this.currentQuiz = data[0];
      this.currentPage = "singleQuiz";
    },
    nextQuestion: function () {
      this.currentQuizQuestion++;
      this.currentQuizQuestionAnswered = false;
    },

    answerQuestion: function (answer) {
      if (answer.isCorrect) {
        this.currentQuizTotalScore++;
      }
      this.currentQuizQuestionAnswered = true;
    },
    editQuiz: function (quiz) {
      this.newQuiz = quiz;
      this.newQuestions = quiz.questions;
      this.currentPage = "createQuiz";
      this.editingQuiz = true;
    },
    saveQuiz: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      this.newQuiz.questions = this.newQuestions;
      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(this.newQuiz),
      };
      let response = await fetch(
        `${URL}/quizzes/${this.newQuiz._id}`,
        requestOptions
      );
      if (response.status === 204) {
        this.getQuizes();
        this.clearQuiz();
        this.currentPage = "quizzes";
      } else {
        console.log("failed to update quiz");
      }
    },
  },
  created: function () {
    console.log("Created Vue");
    this.getSession();
  },
}).mount("#app");
