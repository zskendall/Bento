const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');

const DATA_MISSING_MSG = 'Required weather data missing!';

// App data
const weather = {};
weather.temperature = {
  unit: 'celsius',
};

// Change to 'F' for Fahrenheit
var tempUnit = 'F';

const KELVIN = 273.15;

// Periodically update the weather during the day
let intervals = {};
maybeStartWeatherWatch();

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // Don't refresh weather when the page is hidden
    stopWeatherWatch();
  } else {
    // When the page becomes visible again, refresh weather
    maybeStartWeatherWatch();
  }
});

function maybeStartWeatherWatch() {
  getWeather();

  const now = new Date();
  if (!intervals.watch && (now.getHours() >= 11 || now.getHours() < 3)) {
    console.log('starting weather watch');
    intervals.watch = setInterval(getWeather, 1000 * 60 * 15); // every 15 min

    // Schedule the weather watch to stop
    const runForMillis = new Date(
      now.getFullYear(), now.getMonth(),
      now.getHours() < 3 ? now.getDate() : now.getDate() + 1, 3, 15, 0, 0)
      - now;
    intervals.nextStop = setTimeout(stopWeatherWatch, runForMillis);
  }

  // Schedule the weather watch to restart
  const nextWatchMillis = new Date(
    now.getFullYear(), now.getMonth(),
    now.getHours() < 11 ? now.getDate() : now.getDate() + 1, 11, 0, 0, 0) - now;
  intervals.nextStart = setTimeout(maybeStartWeatherWatch, nextWatchMillis);
}

function stopWeatherWatch() {
  console.log('stopping weather watch');
  clearInterval(intervals.watch);
  intervals.watch = null;
}

// Get the Weather data
function getWeather() {
  // Use your own key for the Weather, Get it here: https://openweathermap.org/
  // If unset, will prompt to enter.
  const key = localStorage.weatherkey;
  // You can use https://www.latlong.net/ to get it!
  const lat = localStorage.lat;
  const lng = localStorage.lng;

  if (!(key && lat && lng)) {
    const missing = Object.keys(Object.fromEntries(
      Object.entries({key, lat, lng}).filter(([k, v]) => !v)));
    if (missing.includes('key')) {
      // key must be prefixed for modal
      missing[missing.indexOf('key')] = 'weatherkey';
    }
    openModal('weather', DATA_MISSING_MSG, missing);
    return false;
  }


  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appId=${key}`;

  fetch(api)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      if (response.status === 401 || resopnse.status === 400) {
        // key, lat, or lng not specified in request; attempt to resolve by
        // prompting for this data
        openModal('weather', DATA_MISSING_MSG);
      }

      throw new Error(
        `Could not fetch weather: ${response.status} (${response.statusText})`);
    })
    .then(data => {
      let celsius = Math.floor(data.main.temp - KELVIN);
      weather.temperature.value =
        tempUnit == 'C' ? celsius : (celsius * 9) / 5 + 32;
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      iconElement.innerHTML =
        `<img src="icons/OneDark/${weather.iconId}.png"/>`;
      tempElement.innerHTML =
        `${weather.temperature.value}°<span class="darkfg">${tempUnit}</span>`;
    });
}

// Saves state in local storage
function saveWeatherState(el) {
  for (const input of el.querySelectorAll('input.form-control')) {
    const val = input.value;
    if (val) {
      localStorage.setItem(input.getAttribute('id'), val);
    }
  }
  closeModal();
  maybeStartWeatherWatch();
  return false;
}
