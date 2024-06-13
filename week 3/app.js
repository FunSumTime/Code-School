Vue.createApp({
  data() {
    return {
      h1text: "hello world!",
      items: [
        { text: "item 1", color: "#0f0", show: true },
        { text: "item 2", color: "#f00", show: true },
        { text: "item 3", color: "#00f", show: true },
        { text: "item 4", color: "#ff0", show: true },
      ],
      showText: true,
    };
  },
  methods: {
    toggleOnorOff: function (item) {
      console.log(item);

      item.show = !item.show;
    },
    appendText: function (item) {
      item.text += "b";
    },
    showHideText: function () {
      this.showText = !this.showText;
    },
  },
  created: function () {
    console.log("vue app loaded");
  },
}).mount("#app");
