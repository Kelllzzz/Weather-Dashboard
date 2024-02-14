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
          console.log(element);
        }

      }
    });
}

// Function for displaying weather data
function renderButtons() {

  // Deletes the cities prior to adding new cities otherwise you will have repeat buttons
  $("#history").empty();

  // Loops through the array of citys checked
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generates buttons for each city in the array
    var a = $("<button>");
    // Adds a class of city to our button
    a.addClass("city");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#history").append(a);
  }
}

// This function handles events where the search button is clicked
$("#search-button").on("click", function (event) {
  event.preventDefault();

  // This line of code will grab the input from the textbox
  var city = $("#search-input").val().trim();

  // The city from the textbox is then added to our array
  cities.push(city);
  console.log(city);
  displayWeatherInfo(city);

  // Calling renderButtons which handles the processing of our city array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".list-group", displayWeatherInfo);

//Calling the renderButtons function to display the initial buttons
renderButtons();
var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}`;

function currentWeather() {
  var currentQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${myApiKey}&units=metric`
  fetch(currentQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //Today's date
      var todaysDate = dayjs().format("dddd, DD MMMM YYYY");
      $("#date").text(todaysDate);
      var temp = document.getElementById("temp");
      temp.textContent = `Temp: ${data.main.temp}℃`;
      var wind = document.getElementById("wind")
      wind.textContent = `Wind: ${data.wind.speed}m/s`;
      var humidity = document.getElementById("hum");
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
    });


}


