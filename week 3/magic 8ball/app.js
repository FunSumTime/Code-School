Vue.createApp({
  data() {
    return {
      answer: "",
      question: "",
      answerBank: ["Yes", "No", "Probably"],
      showButton: false,
      buttonText: "Ask a qeustion.",
      history: [],
    };
  },
  methods: {
    askQuestion: function () {
      if (this.validQuestion()) {
        console.log(this.question);
        // pick random answer

        let index = Math.floor(Math.random() * this.answerBank.length);
        this.answer = this.answerBank[index];
        this.history.push({
          question: this.question,
          answer: this.answer,
        });
        this.question = "";
      }
    },
    validQuestion: function () {
      let questionIndex = this.question.length;
      if (this.question[questionIndex - 1] === "?") {
        return true;
      } else {
        return false;
      }
    },
    deleteItem: function (index) {
      this.history.splice(index, 1);
    },
  },
  created: function () {
    console.log("created");
  },
}).mount("#app");

// v-if
// v-else
// v-show
// v-on:click = "foo()"
// v-cloak will stop flickering
// v-for
// v-bind:style= "{color: #}"
// v-model
