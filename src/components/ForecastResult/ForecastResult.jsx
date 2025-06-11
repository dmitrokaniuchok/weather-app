import css from "./ForecastResult.module.css";

function getDailyForecasts(forecast) {
  if (!forecast || !forecast.list) return [];

  const dailyMap = new Map();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split("T")[0];

    if (!dailyMap.has(dayKey)) {
      dailyMap.set(dayKey, item);
    } else {
      const existing = dailyMap.get(dayKey);
      const targetHour = 12;
      if (
        Math.abs(date.getHours() - targetHour) <
        Math.abs(new Date(existing.dt * 1000).getHours() - targetHour)
      ) {
        dailyMap.set(dayKey, item);
      }
    }
  });

  return Array.from(dailyMap.values()).slice(0, 5);
}

export default function ForecastResult({ forecast }) {
  if (!forecast) return null;

  const dailyForecasts = getDailyForecasts(forecast);

  return (
    <>
      <h2 style={{ color: "#006064" }}>Прогноз на 5 днів</h2>
      <div className={css.forecastResult}>
        {dailyForecasts.map((item) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString("uk-UA", {
            weekday: "short",
            day: "numeric",
            month: "long",
          });
          const temp = Math.round(item.main.temp);
          const icon = item.weather[0].icon;
          const description = item.weather[0].description;

          return (
            <div key={item.dt} className={css.forecastItem}>
              <div>{day}</div>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                width={50}
                height={50}
              />
              <div>{temp}°C</div>
              <div className={css.description}>{description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
