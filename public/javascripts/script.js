/* global axios */
var app = new Vue({
  el: '#app',
  data: {
    maleName: "",
    femaleName: "",
    maleLabel: "",
    femaleLabel: "",
    loading: true,
    noError: true,
    percentage: "",
    result: "",
    malePic: "",
    femalePic: "",
  },
  methods: {
    
    async fetchLoveInfo() {
      var url = "/loveinfo?male=" + this.maleName + "&female=" + this.femaleName;
      try {
        this.loading = true;
        document.getElementById("api-results").className = "show w3-animate-bottom";
        document.getElementById("app").className="w3-animate-top"
        const response = await axios.get(url);
        var json = response.data;
        
        console.log(json);

        // No error
        if (json.message == undefined) {
          this.fetchPics();
          app.percentage = json.percentage + "% match!";
          app.result = json.result;
          console.log("Male pic: " + this.malePic);
          console.log("Female pic: " + this.femalePic);
          app.loading = false;
          document.getElementById("app").className="w3-animate-top grow-success"
          app.noError = true;
          app.$forceUpdate();
        }
        else{
          app.result = "An error occured with the API. Try entering different names or wait a little bit.";
          app.percentage = "";
          app.loading = false;
          document.getElementById("app").className="w3-animate-top grow-error"
          app.noError = false;
        }
      }
      catch (error) {
        console.log(error);
      }
    },
    fetchPics() {
      var urlMale = "/profilepic?q=male";
      fetch(urlMale)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          app.malePic = json.results[0].picture["large"];
          app.maleLabel = app.maleName;
        });
      var urlFemale = "/profilepic?q=female";
      fetch(urlFemale)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          app.femalePic = json.results[0].picture["large"];
          app.femaleLabel = app.femaleName;
        });
    }
  },
});
