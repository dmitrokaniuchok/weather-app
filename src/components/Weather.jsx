import { useState, useEffect } from "react";
import { fetchWeather } from "../../weatherApi.js";
import css from "./Weather.module.css";
import toast from "react-hot-toast";

export default function Weather() {
  const defaultCity = "Харків";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
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
    try {
      const data = await fetchWeather(cityName);
      setWeather(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetWeather(defaultCity);
  }, []);

  const handleSearch = () => {
    fetchAndSetWeather(city);
  };

  return (
    <div className={css.weatherContainer}>
      <h1 className={css.title}>Погода</h1>

      <div className={css.searchBox}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введіть місто"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>Пошук</button>
      </div>

      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className={css.weatherResult}>
          <div className={css.leftColumn}>
            <h2>{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
          <div className={css.rightColumn}>
            <p>Температура: {Math.round(weather.main.temp)}°C</p>
            <p>Відчувається як: {Math.round(weather.main.feels_like)}°C</p>
            <p>Погода: {weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
