Vue.createApp({
  data() {
    return {
      rows: 5,
      cols: 5,

      moleRow: -1,
      moleCol: -1,

      total: 0,
      hit: 0,
    };
  },
  methods: {
    updateMole: function () {
      let updateMoleInt = setInterval(() => {
        this.moleRow = Math.ceil(Math.random() * this.rows);
        this.moleCol = Math.ceil(Math.random() * this.cols);
        this.total++;
        // this will stop the game once it reaches 10.
        if (this.total >= 10) {
          setTimeout(() => {
            this.moleRow = -1;
            this.moleCol = -1;
          }, 1000);
          clearInterval(updateMoleInt);
        }
      }, 1000);
    },
    hitMole: function () {
      this.hit++;
      this.moleRow = -1;
      this.moleCol = -1;
    },
  },
  created: function () {
    this.updateMole();
  },
}).mount("#app");
