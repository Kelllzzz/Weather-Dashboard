// Defining Variables
var cities = [];
var daysForecast = document.querySelector(".days-forecast")
var currentForecast = document.querySelector(".current-weather")
const myApiKey = "7097c74eef259450827e90a52b7f0e67";
var city = $("#search-input").val().trim();
var la = 0;
var lo = 0;
const submit = $("#search-button");
// To maintain user search history upon refresh
if (localStorage.getItem("cities")) {
  cities = JSON.parse(localStorage.getItem("cities"));
  renderButtons();
}
var queryWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${la}&lon=${lo}&appid=${myApiKey}&units=metric`;

// displayWeatherInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo(city) {

  var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + myApiKey;

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
      
      queryWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${la}&lon=${lo}&appid=${myApiKey}&units=metric`;
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
      daysForecast.innerHTML = "";
      const colors = ["bg-dark", "bg-primary", "bg-warning", "bg-info", "bg-success"];
      for (let i = 0; i < data.list.length; i++) {
        const element = data.list[i];
        if (element.dt_txt.includes("12:00:00")) {
          console.log(element);
          var weatherCard = ` 
        <div class="col mb-3 justify-content-between">
        <div class="card border-0 ${colors[i % colors.length]} text-white">
            <div class="card-body">
              <h5 class="card-title">(${data.list[i].dt_txt.split(" ")[0]})</h5>
            <img src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" Alt="Weather Icon">
              <h6 id="desc" class="mt-3 my-3">${data.list[i].weather[0].description}</h6>
              <h6 id="temp" class="mt-3 my-3">Temp: ${data.list[i].main.temp}℃</h6>
              <h6 id="wind" class="my-3">Wind: ${data.list[i].wind.speed}m/s</h6>
              <h6 id="hum" class="my-3">Humidity: ${data.list[i].main.humidity} %</h6>
            </div>
           </div>
        </div>
          `;
          var weatherDiv = document.createElement("section");
          weatherDiv.innerHTML = weatherCard;
          daysForecast.appendChild(weatherDiv);

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
    var a = $("<button class='button-spacing'>Button Text</button>");
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
  var city = $("#search-input").val().trim();
  if (city === "") {
    alert("Please enter a valid city");
    return
  }
  if (city === undefined) {
    alert("Please enter a valid city");
    return
  }

  else {
    // This line of code will grab the input from the textbox
    city.innerText = `${"#search-input"}`

    // Clear the input field
    $("#search-input").val('');
  }
  // The city from the textbox is then added to our array
  cities.push(city);
  console.log(city);
  displayWeatherInfo(city);

  // Store userinput in localstorage
  localStorage.setItem("cities", JSON.stringify(cities));

  // Calling renderButtons which handles the processing of our city array
  renderButtons();
});

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".list-group", (event) => {
  displayWeatherInfo($(event.target).attr("data-name"))
});

//Calling the renderButtons function to display the initial buttons
renderButtons();
var queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myApiKey}&units=metric`;

function currentWeather() {
  var currentQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${la}&lon=${lo}&appid=${myApiKey}&units=metric`
  fetch(currentQueryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.name);
      var place = data.name;
      $(".day").empty();
      $(".day").append(place);
      // Today's date
      let todaysDate = dayjs().format("dddd, DD MMMM YYYY");
      $("#date").text(todaysDate);
      // To create weather card for current day
      var weatherIcon = document.querySelector('.day');
      var img = document.createElement("img");
      img.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIcon.appendChild(img);
      var temp = document.getElementById("temp");
      temp.textContent = `Temp: ${data.main.temp}℃`;
      var wind = document.getElementById("wind")
      wind.textContent = `Wind: ${data.wind.speed}m/s`;
      var humidity = document.getElementById("hum");
      humidity.textContent = `Humidity: ${data.main.humidity}%`;

    });
}

// To clear search history
var clearInterval = document.getElementById('clear-history');
clearInterval.addEventListener("click", clear)

function clear() {
    localStorage.removeItem("cities");
}
