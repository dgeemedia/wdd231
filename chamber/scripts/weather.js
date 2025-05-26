// weather.js
const weatherAPI =
  'https://api.openweathermap.org/data/2.5/forecast' +
  '?lat=6.48&lon=3.05' +
  '&appid=1b6f8a0550941ee597e79c76b04380f5' +
  '&units=metric';

export async function fetchWeather() {
  const t = document.getElementById('temperature');
  const d = document.getElementById('description');
  const i = document.getElementById('graphic');
  const f = document.getElementById('forecast');
  if (!t || !d || !i || !f) return;

  try {
    const res  = await fetch(weatherAPI);
    const data = await res.json();

    t.textContent = `${data.list[0].main.temp.toFixed(1)} °C`;
    d.textContent = data.list[0].weather[0].description;
    i.src         = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    i.alt         = data.list[0].weather[0].description;

    f.innerHTML = '';
    data.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 3)
      .forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const li   = document.createElement('li');
        li.innerHTML = `
          <strong>${date.toLocaleDateString(undefined, { weekday:'short' })}</strong>:
          ${forecast.main.temp.toFixed(1)} °C, ${forecast.weather[0].description}
          <img
            src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png"
            alt="${forecast.weather[0].description}">
        `;
        f.appendChild(li);
      });
  } catch (err) {
    console.error('Weather Fetch Error:', err);
  }
}
