import { useState, useEffect, useRef } from "react";
import { fetchWeather, fetchForecast } from "../../weatherApi.js";
import css from "./Weather.module.css";
import toast from "react-hot-toast";
import SearchBox from "../SearchBox/SearchBox.jsx";
import WeatherResult from "../WeatherResult/WeatherResult.jsx";
import ForecastResult from "../ForecastResult/ForecastResult.jsx";

export default function Weather() {
  // const defaultCity = "Харків";
  const inputRef = useRef(null);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAndSetWeather = async (cityName) => {
    if (!cityName.trim()) {
      toast.error("Введіть назву міста!");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    try {
      const dataWeather = await fetchWeather(cityName);
      const dataForecast = await fetchForecast(cityName);

      console.log("Forecast data:", dataForecast);

      setWeather(dataWeather);
      setForecast(dataForecast);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchAndSetWeather(defaultCity);
  // }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = () => {
    fetchAndSetWeather(city);
  };

  const handleGeoWeather = () => {
    if (!navigator.geolocation) {
      toast.error("Геолокація не підтримується вашим браузером або вимкнена!");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        try {
          // Поточна погода
          const responseWeather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric&lang=ua`
          );

          if (!responseWeather.ok) {
            throw new Error(
              "Не вдалося отримати поточну погоду за геолокацією."
            );
          }

          const dataWeather = await responseWeather.json();

          // Запит на прогноз на 5 днів
          const responseForecast = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric&lang=ua`
          );

          if (!responseForecast.ok) {
            throw new Error("Не вдалося отримати прогноз за геолокацією.");
          }

          const dataForecast = await responseForecast.json();

          setWeather(dataWeather);
          setForecast(dataForecast);
          setCity("");
        } catch (err) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Не вдалося отримати геолокацію користувача.");
        setLoading(false);
      }
    );
  };

  const handleClear = () => {
    setCity("");
    setWeather(null);
    setForecast(null);
    setError("");
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div className={css.weatherContainer}>
      <h1 className={css.title}>Погода</h1>

      <SearchBox
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
        onGeoLocate={handleGeoWeather}
        onClear={handleClear}
        inputRef={inputRef}
      />

      {loading && <div className={css.loader} />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && <WeatherResult weather={weather} />}
      {forecast && <ForecastResult forecast={forecast} />}
    </div>
  );
}
