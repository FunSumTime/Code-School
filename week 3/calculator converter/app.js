Vue.createApp({
  data() {
    return {
      kbInput: "",
      Binput: "",
      bytes: null,
      megabits: null,
      ginput: "",
      terabyte: null,
    };
  },
  methods: {
    KToB: function () {
      this.bytes = this.kbInput * 1000;
    },
    BToMeg: function () {
      // will make it to 5 decimal points
      this.megabits = this.Binput * (0.0000008).toFixed(5);
    },
    gToTer: function () {
      this.terabyte = this.ginput * 0.001;
    },
  },
  created: function () {
    console.log("vue app created");
  },
}).mount("#app");
