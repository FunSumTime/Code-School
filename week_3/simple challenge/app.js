Vue.createApp({
  data() {
    return {
      user: "",
      Name: "User",
      bkgColor: "#fff",
    };
  },
  methods: {
    submitName: function () {
      this.Name = this.user;
      this.user = "";
    },
    changebkgBl: function () {
      bkgColor = "#0000FF";
    },
    changebkgBr: function () {
      bkgColor = "#964B00";
    },
    changebkgAq: function () {
      bkgColor = "#00FFFF";
    },
  },
  created: function () {
    console.log("vue app loaded");
  },
}).mount("#app");
