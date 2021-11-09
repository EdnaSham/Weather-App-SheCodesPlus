function formatDayTime(timestamp) {
  let daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = daysOfTheWeek[timestamp.getDay()];
  let currentHour = timestamp.getHours();
  currentHour = ("0" + currentHour).slice(-2);
  let currentMinutes = timestamp.getMinutes();
  currentMinutes = ("0" + currentMinutes).slice(-2);

  let todaysDayTime = document.querySelector("#dayTime");
  todaysDayTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes} UTC`;
}

function getCityInfo(response) {
  let currentTemp = document.querySelector("#temprature");
  let currentWeatherDescription = document.querySelector("#weatherDescription");
  let currentWind = document.querySelector("#cityWind");
  let currentHumidity = document.querySelector("#cityHumidity");
  //celGlobalTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentWeatherDescription.innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);

  let currentWeatherIcon = document.querySelector("img");
  currentWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  formatDayTime(new Date(response.data.dt * 1000));

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecast = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;

  let timestamp = new Date(response.data.daily[1].dt * 1000);
  let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 5; i++) {
    let day =
      daysOfTheWeek[new Date(response.data.daily[i + 1].dt * 1000).getDay()];
    forecastHTML =
      forecastHTML +
      `<div class="col-2" id="forecastInfo">
            <span id="forecastedDay">${day}</span><br /><img  
              src=${`https://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`}
              alt="Icon"
              width="40px"
            />
            <br />
            <span id="maxTemp">${Math.round(
              response.data.daily[i].temp.max
            )}°   </span><span id="minTemp">${Math.round(
        response.data.daily[i].temp.min
      )}°</span>
          </div>`;
  }
  forecastHTML = forecastHTML + `</div`;

  forecast.innerHTML = forecastHTML;
}

function displaySearchedCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enterACity");
  let displayCityName = document.querySelector("#displayTheCity");
  if (cityName != "") {
    displayCityName.innerHTML = cityName.value;
    displayCityInfo(cityName.value);
  } else {
  }
}

function displayEnteredCity(event) {
  let cityName = document.querySelector("#enterACity");
  let displayCityName = document.querySelector("#displayTheCity");
  if (event.keyCode === 13) {
    displayCityName.innerHTML = cityName.value;
    displayCityInfo(cityName.value);
  } else {
  }
}

function displayCityInfo(cityName) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(getCityInfo);
}

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

//let celGlobalTemp = null;

let apiURL =
  "https://api.openweathermap.org/data/2.5/weather?q=austin&appid=50c2acd53349fabd54f52b93c8650d37&units=imperial";

axios.get(apiURL).then(getCityInfo);

let searchClicked = document.querySelector("#searchTheCity");
searchClicked.addEventListener("click", displaySearchedCity);

let cityNameClicked = document.querySelector("#enterACity");
cityNameClicked.addEventListener("keydown", displayEnteredCity);

let currentClicked = document.querySelector("#currentCity");
currentClicked.addEventListener("click", displayCurrentCityInfo);

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
