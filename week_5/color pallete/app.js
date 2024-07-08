Vue.createApp({
  data() {
    return {
      inputRed: 0,
      inputGreen: 0,
      inputBlue: 0,
      rgbstring: "rgb(255,2,21)",
      pallet: [],
    };
  },
  methods: {
    submit: function () {
      this.inputBlue = Math.floor(Math.random() * 255);
      this.inputGreen = Math.floor(Math.random() * 255);
      this.inputRed = Math.floor(Math.random() * 255);
    },
    addCol: function () {
      this.pallet.push(this.color);
    },
  },
  computed: {
    color: function () {
      if (
        this.inputBlue <= 255 &&
        this.inputRed <= 255 &&
        this.inputGreen <= 255
      ) {
        this.rgbstring = "";

        return (
          this.rgbstring +
          "rgb(" +
          this.inputRed +
          "," +
          this.inputGreen +
          "," +
          this.inputBlue +
          ")"
        );
      } else {
        alert("error not good values");
      }
    },
  },
  created: function () {
    console.log("Vue app created");
  },
}).mount("#app");
