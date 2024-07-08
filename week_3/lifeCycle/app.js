Vue.createApp({
  data() {
    return {
      inputName: "",
      username: "User",
      colors: ["aquamarine", "coral", "cadetblue"],
      activeColor: "#fff",
    };
  },
  methods: {
    changeColor: function (color) {
      this.activeColor = color;
    },
    enterName: function () {
      this.username = this.inputName;
    },
  },
  //   called right after the instance has been intialized
  // but befor data observation starts
  beforeCreate: function () {
    console.log("beforeCreate");
  },
  //   called afte the instance has been intialized at this point
  // data observation is happening. Great place to fetch data
  created: function () {
    console.log("Vue app created");
  },
  //   called right before mounting begins, the render function is about to be
  // called for the first time So befor they your stuff is veiwed
  beforeMount: function () {
    console.log("beforeMount");
  },
  //   called after the omponet has been mounted to the Dom
  // good place to acces Dom elements
  mounted: function () {
    console.log("mounted");
  },
  //   called when datahas chagned but befor the dom has re-rendered
  beforeUpdate: function () {
    console.log("beforeUpdate");
  },
  //  Called after the dom has been re-rendered
  //   use this for action that depend on the DOM
  updated: function () {
    console.log("updated");
  },
}).mount("#app");

// lifecycle of something on the screen "created"
