// Defining Variables
const myApiKey = "7097c74eef259450827e90a52b7f0e67";
var city = $("#search-input").val().trim();
var la = 0;
var lo = 0;
const submit = $("#search-button");
var queryWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${la}&lon=${lo}&appid=${myApiKey}`;
var cities = [];



