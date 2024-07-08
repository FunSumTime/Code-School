const appLink = "http://localhost:8080/legal-songs";

Vue.createApp({
  data: function () {
    return {
      legal_songs: [],
    };
  },
  methods: {
    loadsongs: async function () {
      let response = await fetch(appLink);
      this.legal_songs = await response.json();
    },
  },
  created: function () {
    console.log(" created vue app");
    this.loadsongs();
  },
}).mount("#app");
