// Defining Variables
const myApiKey = "7097c74eef259450827e90a52b7f0e67";
var city = document.querySelector("#search-input");
var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + myApiKey;
const btn = document.querySelector("#search-button")

