const URL = "https://official-joke-api.appspot.com/jokes";

Vue.createApp({
  data() {
    return {
      jokes: [],
      searchinput: "",
    };
  },
  methods: {
    getJokes: async function () {
      let response = await fetch(`${URL}/ten`);
      let data = await response.json();
      this.jokes = data;
      console.log("hello");
      console.log(this.jokes);
    },

    switchJoke: async function (index) {
      let radnomindex = Math.floor(Math.random() * 9);
      this.jokes[index] = this.jokes[radnomindex];
    },
    // addJoke: async function () {
    //   let myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    //   let encodedData =
    // },
  },
  computed: {
    filterJokes: function () {
      return this.jokes.filter((joke) => {
        return joke.setup
          .toLowerCase()
          .includes(this.searchinput.toLowerCase());
      });
    },
  },
  created: function () {
    console.log("Vue created");
    this.getJokes();
  },
}).mount("#app");
