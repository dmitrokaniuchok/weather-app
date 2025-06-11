const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ua`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Такого міста не існує!");
  }

  const data = await response.json();
  return data;
}

const BASE_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchForecast(city) {
  const url = `${BASE_URL_FORECAST}?q=${city}&appid=${API_KEY}&units=metric&lang=ua`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Не вдалося завантажити прогноз погоди! 😓");
  }

  const data = await response.json();
  return data;
}
