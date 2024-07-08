Vue.createApp({
  data() {
    return {
      newtask: [],
      Task: {
        description: "",
        category: "",
      },
      searchInput: "",
      modal: {
        description: "",
        category: "",
        index: -1,
      },
      modalOpen: false,
    };
  },
  methods: {
    addTask: function () {
      this.newtask.push(this.Task);
      this.Task.description = "";
      this.Task.category = "";
    },
    deleteTask: function (index) {
      this.newtask.splice(index, 1);
    },

    toggleModal: function (index = null) {
      this.modalOpen = !this.modalOpen;
      if (index !== null) {
        let task = this.newtask[index];
        this.modal.index = index;
        this.modal.description = task.description;
        this.modal.category = task.category;
      }
    },
    updateTask: function () {
      newtask[modal.index].description = modal.description;
      newtask[modal.index].category = modal.category;
      modal.description = "";
      modal.category = "";
      this.toggleModal();
    },
  },
  computed: {
    filterdTask: function () {
      return this.newtask.filter((task) => {
        return task.description
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },
  },
}).mount("#app");
