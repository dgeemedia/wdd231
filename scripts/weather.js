// DOM references
const weatherCard   = document.querySelector('.card.weather');
const forecastCard  = document.querySelector('.card.forecast');

// Your OpenWeatherMap API key
const OWM_API_KEY = '1b6f8a0550941ee597e79c76b04380f5';

// Fetch and render weather
async function fetchWeather(lat, lon) {
  const weatherURL  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OWM_API_KEY}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=3&appid=${OWM_API_KEY}`;

  try {
    // Current
    const wRes  = await fetch(weatherURL);
    const wData = await wRes.json();
    const iconCode = wData.weather[0].icon;                                    // e.g. "10d"
    const iconUrl  = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCard.innerHTML = `
      <h3 class="card-title">Current Weather</h3>
      <div class="weather-now">
        <img src="${iconUrl}" alt="${wData.weather[0].description} icon" class="weather-icon">
        <div class="weather-info">
          <p><strong>${Math.round(wData.main.temp)}°F</strong></p>
          <p>${wData.weather[0].description}</p>
          <p>High: ${Math.round(wData.main.temp_max)}° | Low: ${Math.round(wData.main.temp_min)}°</p>
          <p>Humidity: ${wData.main.humidity}%</p>
          <p>Sunrise: ${new Date(wData.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: ${new Date(wData.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      </div>
    `;

    // Forecast
    const fRes  = await fetch(forecastURL);
    const fData = await fRes.json();

    let forecastHTML = `<h3 class="card-title">Weather Forecast</h3>`;
    fData.list.forEach(item => {
      const time = new Date(item.dt * 1000)
                         .toLocaleTimeString([], { hour: 'numeric', hour12: true });
      forecastHTML += `
        <p><strong>${time}: ${Math.round(item.main.temp)}°F</strong> — ${item.weather[0].main}</p>
      `;
    });
    forecastCard.innerHTML = forecastHTML;

  } catch (err) {
    console.error('Weather API error:', err);
    weatherCard.textContent   = 'Unable to load weather data.';
    forecastCard.textContent  = '';
  }
}

// Geolocation + initial call
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
    ()  => { weatherCard.textContent = 'Location permission denied.'; }
  );
} else {
  weatherCard.textContent = 'Geolocation not supported.';
}
