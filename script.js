const searchBtn = document.querySelector('.searchbtn');
const errText = document.querySelector('#errtext');

searchBtn.addEventListener('click', () => {
  const apiKey = '4e3a72e591abbbff32e0bb80ac4c0091';
  const city = document.getElementById('city').value;

  if (city) {
    errText.textContent = "";
    
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
      .then(response => response.json())
      .then(data => displayWeather(data))
      .catch(err => {
        if (err) {
          console.log(err);
          errText.textContent = "Not found! DAMIT";
        } else {
          errText.textContent = "";
        }
      });

    fetch(forecastURL)
      .then(response => response.json())
      .then(data => forecast(data))
      .catch(err => console.log(err))

  } else {
    errText.textContent = "Enter a Place, DAMIT!";
    return;
  }

});

const displayWeather = (data) => {
  const cityHeader = document.getElementById('cityname');
  const weatherIcon = document.getElementById('weatherimg');
  const tempText = document.getElementById('temperature');
  const summary = document.getElementById('summary');
  const weatherInfoDiv = document.querySelector('.weatherinfo');

  cityHeader.textContent = '';
  weatherIcon.src = '';
  tempText.textContent = '';
  summary.textContent = '';

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p style={color: red}>${data.msg}</p>`
  } else {
    const cityName = data.name;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const temp = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;

    cityHeader.textContent = cityName;
    weatherIcon.src = iconURL;
    tempText.innerHTML = `${temp}&#8451;`;
    summary.textContent = description;
  }
}

const forecast = (hourlyData) => {
  const hourlyForecastSec = document.querySelector('.forecastinfo');
  hourlyForecastSec.innerHTML = " ";
  let forecastItemDiv = "";

  const next24Hours = hourlyData.list.slice(0, 8);
  next24Hours.forEach(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temp = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    const description = item.weather[0].description;

    forecastItemDiv += `
      <div class="hourly-div">
        <h2 class="time">${hour}:00</h2>
        <img class="forecastimg" src="${iconURL}"/>
        <h2 class="temp">${temp}&#8451;</h2>
        <p class="desc">${description}</p>
      </div>
    `;

    hourlyForecastSec.innerHTML = forecastItemDiv

  });
};