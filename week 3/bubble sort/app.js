Vue.createApp({
  data() {
    return {
      array: [
        24, 12, 23, 43, 5, 45, 4, 32, 12, 12, 343, 5467, 1, 123, 43557, 887, 9,
      ],
    };
  },
  methods: {
    bubbleSort: function () {
      for (let i = 0; i < this.array.length; i++) {
        for (let j = 0; j < this.array.length - i - 1; j++) {
          if (this.array[j] > this.array[j + 1]) {
            let temp = this.array[j];
            this.array[j] = this.array[j + 1];
            this.array[j + 1] = temp;
          }
        }
      }
      console.log(this.array);
    },
  },
}).mount("#app");
