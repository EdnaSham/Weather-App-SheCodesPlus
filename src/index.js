//Display the current date and time using JavaScript such as Tuesday 16:00
function formatDayTime(timestamp) {
  let currentDayTime = timestamp;

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
  todaysDayTime.innerHTML = `${today} UTC`;
}

//Add a search engine, when searching for a city (i.e. Paris),
// display the city name and current temperature on the page after the user submits the form.

function getCityInfo(response) {
  let currentTemp = document.querySelector("#temprature");
  let currentWeatherDescription = document.querySelector("#weatherDescription");
  let currentWind = document.querySelector("#cityWind");
  let currentHumidity = document.querySelector("#cityHumidity");
  let currentMinTemp = document.querySelector("#minTemp");
  let currentMaxTemp = document.querySelector("#maxTemp");

  //celGlobalTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentWeatherDescription.innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  currentMinTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  currentMaxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;

  let currentWeatherIcon = document.querySelector("img");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  formatDayTime(new Date(response.data.dt * 1000));
}

function displaySearchedCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enterACity");
  let displayCityName = document.querySelector("#displayTheCity");
  if (cityName != "") {
    displayCityName.innerHTML = cityName.value;
    displaySearchedCityInfo(cityName.value);
  } else {
  }
}

function displayEnteredCity(event) {
  let cityName = document.querySelector("#enterACity");
  let displayCityName = document.querySelector("#displayTheCity");
  if (event.keyCode === 13) {
    displayCityName.innerHTML = cityName.value;
    displaySearchedCityInfo(cityName.value);
  } else {
  }
}

function displaySearchedCityInfo(cityName) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(getCityInfo);
}

//let celGlobalTemp = null;

let apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=austin&appid=50c2acd53349fabd54f52b93c8650d37&units=imperial";

axios.get(apiURL).then(getCityInfo);

let searchClicked = document.querySelector("#searchTheCity");
searchClicked.addEventListener("click", displaySearchedCity);

let cityNameClicked = document.querySelector("#enterACity");
cityNameClicked.addEventListener("keydown", displayEnteredCity);

/* Add a Current Location button. When clicking on it, 
it uses the Geolocation API to get your GPS coordinates and display 
the city and current temperature using the OpenWeather API. */

function displayCurrentCityInfo(position) {
  function findCoords(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "50c2acd53349fabd54f52b93c8650d37";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    axios.get(apiURL).then(displayCityInfo);

    function displayCityInfo(response) {
      let displayCityName = document.querySelector("#displayTheCity");
      displayCityName.innerHTML = response.data.name;
      axios.get(apiURL).then(getCityInfo);
    }
  }

  navigator.geolocation.getCurrentPosition(findCoords);
}

let currentClicked = document.querySelector("#currentCity");
currentClicked.addEventListener("click", displayCurrentCityInfo);

/* Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
When clicking on it, it should convert the temperature to Fahrenheit. When clicking on
Celsius, it should convert it back to Celsius. */

function showFahTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temprature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  temp.innerHTML = Math.round(celGlobalTemp * (9 / 5) + 32);
}
let fahrenheit = document.querySelector("#fah");
fahrenheit.addEventListener("click", showFahTemp);

/* function showCelTemp(event) {
  event.preventDefault();
  let temp = document.querySelector("#temprature");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  temp.innerHTML = Math.round(celGlobalTemp);
} */

/* let celsius = document.querySelector("#cel");
let temp = document.querySelector("#temprature"); */

// celsius.addEventListener("click", showCelTemp);
