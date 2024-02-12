// Defining Variables
const myApiKey = "7097c74eef259450827e90a52b7f0e67";
var city = $("#search-input").val().trim();
var la = 0;
var lo = 0;
const submit = $("#search-button");
var queryWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${la}&lon=${lo}&appid=${myApiKey}`;
var cities = [];
// displayWeatherInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo(city) {

  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + myApiKey;

  // Creates Fetch call for the button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityObject = data[0];
      var { lon, lat } = cityObject;
      la = lat;
      lo = lon;
      getWeatherInfo();
      currentWeather()
    });

}
function getWeatherInfo() {

  fetch(queryWeatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
for (let index = 0; index < data.list.length; index++) {
  const element = data.list[index];
  if (element.dt_txt.includes("12:00:00")) {
   
  }
  
}
    });

}



