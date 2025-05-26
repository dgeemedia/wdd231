// Select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// URL for current weather data in Trier, Germany
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.7499&lon=6.6371&units=metric&appid=1b6f8a0550941ee597e79c76b04380f5';

// Fetch data from API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // for testing
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  // Set temperature
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  // Build icon URL
  const iconCode = data.weather[0].icon;
  const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Description
  let desc = data.weather[0].description;

  // Update DOM
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

// Call API fetch
apiFetch();
