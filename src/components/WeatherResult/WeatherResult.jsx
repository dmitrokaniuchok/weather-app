import css from "./WeatherResult.module.css";

export default function WeatherResult({ weather }) {
  return (
    <>
      <h2 style={{ color: "#006064" }}>Поточний прогноз</h2>
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
          <p>Вологість: {weather.main.humidity}%</p>
          <p>Вітер: {weather.wind.speed} м/с</p>
          <p>
            Схід сонця:{" "}
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("uk-UA")}
          </p>
          <p>
            Захід сонця:{" "}
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString("uk-UA")}
          </p>
        </div>
      </div>
    </>
  );
}
