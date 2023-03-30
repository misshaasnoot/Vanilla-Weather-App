let now = new Date();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let currentDate = `${day}, ${hours}:${minutes}`;
  let dateHeader = document.querySelector("#current-date");
  dateHeader.innerHTML = currentDate;


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");


  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index > 0)
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="media/icons/${forecastDay.condition.icon}.png"
          alt="drop" id="wind-icon"
          class="weather-forecast-image"
          width="42"
        />
        <div class="weather-forecast-temp">
          <span class="weather-forecast-temp-max">
            ${Math.round(forecastDay.temperature.maximum)}°C /
          </span>
          <span class="weather-forecast-temp-min">
          ${Math.round(forecastDay.temperature.minimum)}°C
          </span>
        </div>
      </div>
    `;
  });

forecastHTML = forecastHTML + `</div`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b56759ebd8a5t745b7782e0304a5ff9o";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#the-city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon")



  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  conditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `media/icons/${response.data.condition.icon}.png`);
  iconElement.setAttribute("alt", `media/icons/${response.data.condition.icon}.png`);

  getForecast(response.data.coordinates)
}

function search(city) {
let apiKey = "b56759ebd8a5t745b7782e0304a5ff9o";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


search("Amsterdam");
