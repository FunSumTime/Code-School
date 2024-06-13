Vue.createApp({
  data() {
    return {
      name_input: "",
      addie_input: "",
      history: [],
      // flag: 0,
      isEditing: false,
      editingIndex: -1,
    };
  },
  methods: {
    submitInput: function () {
      this.history.push({
        Name: this.name_input,
        Address: this.addie_input,
      });
      this.name_input = "";
      this.addie_input = "";
    },
    deleteItem: function (index) {
      this.history.splice(index, 1);
    },
    editItem: function (index) {
      // my code before
      // if (this.flag === 0) {
      //   alert("please input what you want for the edit in the input feilds");
      //   this.flag = 1;
      // } else {
      //   this.history[index] = {
      //     Name: this.name_input,
      //     Address: this.addie_input,
      //   };
      //   this.name_input = "";
      //   this.addie_input = "";
      //   this.flag = 0;
      // }
      this.editingIndex = index;
      let adress = this.history[index];
      this.name_input = adress.Name;
      this.addie_input = adress.Address;
      this.isEditing = true;
    },
    saveEdit: function () {
      let adress = this.history[this.editingIndex];
      adress.Name = this.name_input;
      adress.Address = this.addie_input;
      this.isEditing = false;
      this.editingIndex = -1;
      this.name_input = "";
      this.addie_input = "";
    },
  },
  created: function () {
    console.log("Vue app created");
  },
}).mount("#app");
