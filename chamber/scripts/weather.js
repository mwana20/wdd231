// DOM Elements
const weatherIcon = document.querySelector('#weather-icon');
const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const forecastToday = document.querySelector('#forecast-today');
const forecastTomorrow = document.querySelector('#forecast-tomorrow');
const forecastDayAfter = document.querySelector('#forecast-dayafter');

// API URLs
const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=3.12&lon=101.59&appid=95767b3100bfaadd643e1a5596570421&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=3.12&lon=101.59&appid=95767b3100bfaadd643e1a5596570421&units=metric';

async function apiFetch() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display Current Weather
function displayResults(data) {
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    currentTemp.innerHTML = `<strong>${Math.round(data.main.temp)}</strong> &deg;C`;
    weatherDesc.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    sunrise.textContent = `Sunrise — ${sunriseTime}`;
    sunset.textContent = `Sunset — ${sunsetTime}`;
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Display Forecast
function displayForecast(data) {
    const forecastList = data.list;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const todayDate = today.toISOString().split('T')[0];
    const tomorrowDate = tomorrow.toISOString().split('T')[0];
    const dayAfterDate = dayAfter.toISOString().split('T')[0];

    const todayForecast = forecastList.find(item => item.dt_txt.includes(todayDate) && item.dt_txt.includes('12:00'));
    const tomorrowForecast = forecastList.find(item => item.dt_txt.includes(tomorrowDate) && item.dt_txt.includes('12:00'));
    const dayAfterForecast = forecastList.find(item => item.dt_txt.includes(dayAfterDate) && item.dt_txt.includes('12:00'));

    if (todayForecast) {
        forecastToday.innerHTML = `Today: ${Math.round(todayForecast.main.temp)} &deg;C`;
    }
    if (tomorrowForecast) {
        forecastTomorrow.innerHTML = `${tomorrow.toLocaleDateString('en-US', { weekday: 'long' })}: ${Math.round(tomorrowForecast.main.temp)} &deg;C`;
    }
    if (dayAfterForecast) {
        forecastDayAfter.innerHTML = `${dayAfter.toLocaleDateString('en-US', { weekday: 'long' })}: ${Math.round(dayAfterForecast.main.temp)} &deg;C`;
    }
}

apiFetch();
getForecast();

