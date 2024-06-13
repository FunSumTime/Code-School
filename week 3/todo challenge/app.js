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
      newtask.push(Task);
      Task.description = "";
      Task.category = "";
    },
    deleteTask: function (index) {},
    editTask: function (index) {},

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
