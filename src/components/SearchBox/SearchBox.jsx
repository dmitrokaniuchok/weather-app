import { useState } from "react";
import { FaLocationDot, FaLocationPinLock } from "react-icons/fa6";
import css from "./SearchBox.module.css";

export default function SearchBox({
  city,
  setCity,
  onSearch,
  onGeoLocate,
  onClear,
  inputRef,
}) {
  const [geoActive, setGeoActive] = useState(false);

  const handleGeoClick = () => {
    onGeoLocate();
    setGeoActive(true);
  };

  const handleSearchClick = () => {
    onSearch();
    setGeoActive(false);
  };
  const handleClearClick = () => {
    setGeoActive(false);
    onClear();
  };

  return (
    <div className={css.searchBox}>
      <input
        ref={inputRef}
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введіть місто"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchClick();
        }}
      />
      <button onClick={handleSearchClick}>Пошук</button>
      <button
        onClick={handleGeoClick}
        aria-label="Отримати погоду за геолокацією"
      >
        {geoActive ? (
          <FaLocationDot className={css.geoIcon} />
        ) : (
          <FaLocationPinLock className={css.geoIcon} />
        )}
      </button>
      <button onClick={handleClearClick}>Очистити</button>
    </div>
  );
}
