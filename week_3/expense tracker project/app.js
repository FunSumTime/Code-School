const URL = "http://localhost:8080";

Vue.createApp({
  data() {
    return {
      // this is our meta data
      SearchInput: "",
      expenses: [],
      sortOrder: "",
      modalOpen: true,
      modal: {
        description: "",
        amount: "",
        category: "",
        index: -1,
      },

      newExpense: {
        description: "",
        amount: "",
        category: "",
      },
    };
  },
  methods: {
    // we are getting the data from the website
    getExpense: async function () {
      // will make us go to the expenses path
      // and get the data
      let response = await fetch(`${URL}/expenses`);
      let data = await response.json();
      this.expenses = data;
    },
    // we are sorting the data when the user either searches or hits the amount arroww
    sortExpenses: function () {
      // ascending order
      if (this.sortOrder == "asc") {
        function compare(a, b) {
          if (a.amount > b.amount) return -1;
          if (a.amount < b.amount) return 1;
          return 0;
        }
        this.sortOrder = "desc";
      } else {
        // descending order
        function compare(a, b) {
          if (a.amount < b.amount) return -1;
          if (a.amount > b.amount) return 1;
          return 0;
        }
        this.sortOrder = "asc";
      }
      this.expenses.sort(compare);
    },
    // if you call with no parameter, index will equal null
    toggleModal: function (index = null) {
      this.modalOpen = !this.modalOpen;
      if (index !== null) {
        let expense = this.expenses[index];
        this.modal.index = index;
        this.modal.description = expense.description;
        this.modal.amount = expense.amount;
        this.modal.category = expense.category;
      }
    },

    // This is how update the site for this case
    // we are useing it to edit what the user wants
    // we need a the index which we actually get from the modal
    //  since the modal pops up when they want to edit
    updateExpense: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "description=" +
        encodeURIComponent(this.modal.description) +
        "&amount=" +
        encodeURIComponent(this.modal.amount) +
        "&category=" +
        encodeURIComponent(this.modal.category);

      let requestOptions = {
        method: "PUT",
        body: encodedData,
        headers: myHeaders,
      };

      let expenseId = this.expenses[this.modal.index]._id;
      // will tell it we want it in PUT kinda like what we did before but know we are putting it into the server
      let response = await fetch(
        `${URL}/expenses/${expenseId}`,
        requestOptions
      );
      // this is checking if it failed
      if (response.status == 204) {
        let exp = this.expenses[this.modal.index];
        exp.description = this.modal.description;
        exp.amount = parseFloat(this.modal.amount);
        exp.category = this.modal.category;
      } else {
        alert("Failed to update expense");
      }
      this.toggleModal();
    },

    //  This is how you add to the site,
    //
    //
    //
    //

    addExpense: async function () {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let encodedData =
        "description=" +
        encodeURIComponent(this.newExpense.description) +
        "&amount=" +
        encodeURIComponent(this.newExpense.amount) +
        "&category=" +
        encodeURIComponent(this.newExpense.category);

      let requestOptions = {
        method: "POST",
        body: encodedData,
        headers: myHeaders,
      };
      let response = await fetch(`${URL}/expenses`, requestOptions);
      // console.log(response);
      if (response.status === 201) {
        // getting the stuff back
        let data = await response.json();
        this.expenses.push(data);
        this.newExpense.description = "";
        this.newExpense.amount = "";
        this.newExpense.category = "";
      } else {
        alert("Failed to create expense");
      }
    },

    // This is how you delete from the site and you dont need any headers or encoded data all you need is the method

    deleteExpense: async function (index) {
      let requestOptions = {
        method: "DELETE",
      };

      let expenseId = this.expenses[index]._id;
      console.log(expenseId);

      let response = await fetch(
        `${URL}/expenses/${expenseId}`,
        requestOptions
      );
      console.log(response);
      if (response.status === 204) {
        this.expenses.splice(index, 1);
      } else {
        alert("Failed to delete");
      }
    },
    clearSearch: function () {
      this.SearchInput = "";
    },
  },
  computed: {
    // get the expenses filterd
    balance: function () {
      let total = 0;
      for (expense of this.filterdExpenses) {
        total += parseInt(expense.amount);
      }
      return total;
    },
    // this function right here will filter through the search bar
    filterdExpenses: function () {
      return this.expenses.filter((expense) => {
        return expense.description
          .toLowerCase()
          .includes(this.SearchInput.toLowerCase());
      });
    },
  },
  created: function () {
    console.log("vue app created");
    this.getExpense();
  },
}).mount("#app");
