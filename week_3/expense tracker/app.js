Vue.createApp({
  data() {
    return {
      test: "hello world",
      expenses: [],
    };
  },
  methods: {
    getExpenses: function () {
      // we are getting the data
      fetch("data.json").then((response) => {
        // promises learn
        response.json().then((data) => {
          console.log(data);
          this.expenses = data;
        });
      });
    },
  },
  created: function () {
    console.log("app created");
    this.getExpenses();
  },
}).mount("#app");
