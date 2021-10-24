//Display the current date and time using JavaScript such as Tuesday 16:00
let currentDayTime = new Date();
let daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = daysOfTheWeek[currentDayTime.getDay()];
let currentHour = currentDayTime.getHours();
currentHour = ("0" + currentHour).slice(-2);
let currentMinutes = currentDayTime.getMinutes();
currentMinutes = ("0" + currentMinutes).slice(-2);

let todaysDayTime = document.querySelector("#dayTime");
let today = `${currentDay} ${currentHour}:${currentMinutes}`;
todaysDayTime.innerHTML = today;

//Add a search engine, when searching for a city (i.e. Paris),
// display the city name and current temperature on the page after the user submits the form.

let apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=austin&appid=50c2acd53349fabd54f52b93c8650d37&units=metric";
//console.log(apiURL);
function getDefaultTemp(response) {
  let currentTemp = document.querySelector("#temprature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
}
axios.get(apiURL).then(getDefaultTemp);

function displaySearchedCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enterACity");
  let displayCityName = document.querySelector("#displayTheCity");
  //console.log(enteredCityName);
  if (cityName != "") {
    displayCityName.innerHTML = cityName.value;
    displaySearchedCityTemp(cityName.value);
  } else {
  }
}

function displayEnteredCity(event) {
  let cityName = document.querySelector("#enterACity");
  let displayCityName = document.querySelector("#displayTheCity");
  if (event.keyCode === 13) {
    displayCityName.innerHTML = cityName.value;
    displaySearchedCityTemp(cityName.value);
  } else {
  }
}

function displaySearchedCityTemp(cityName) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  //console.log(apiURL);
  function getCityTemp(response) {
    let currentTemp = document.querySelector("#temprature");
    currentTemp.innerHTML = Math.round(response.data.main.temp);
  }

  axios.get(apiURL).then(getCityTemp);
}

let searchClicked = document.querySelector("#searchTheCity");
searchClicked.addEventListener("click", displaySearchedCity);

let cityNameClicked = document.querySelector("#enterACity");
cityNameClicked.addEventListener("keydown", displayEnteredCity);

/* 🙀 Bonus point:
Add a Current Location button. When clicking on it, 
it uses the Geolocation API to get your GPS coordinates and display 
the city and current temperature using the OpenWeather API. */

let currentClicked = document.querySelector("#currentCity");
currentClicked.addEventListener("click", displayCurrentCityTemp);

function displayCurrentCityTemp() {
  function findCoords(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);

    let apiKey = "50c2acd53349fabd54f52b93c8650d37";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(apiURL);

    axios.get(apiURL).then(displayCityTemp);

    function displayCityTemp(response) {
      let displayCityName = document.querySelector("#displayTheCity");
      let currentTemp = document.querySelector("#temprature");
      displayCityName.innerHTML = response.data.name;
      currentTemp.innerHTML = Math.round(response.data.main.temp);
      console.log(displayCityName);
      console.log(currentTemp);
    }
  }

  navigator.geolocation.getCurrentPosition(findCoords);
}

/* Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
When clicking on it, it should convert the temperature to Fahrenheit. When clicking on
Celsius, it should convert it back to Celsius. */

/* function showFahTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temprature");
  temp.innerHTML = 66;
}

let fahrenheit = document.querySelector("#fah");
fahrenheit.addEventListener("click", showFahTemp);

function showCelTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temprature");
  temp.innerHTML = 19;
}

let celsius = document.querySelector("#cel");
celsius.addEventListener("click", showCelTemp); */
