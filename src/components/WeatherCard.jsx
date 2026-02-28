import React from "react";
import PropTypes from "prop-types";
import "../styles/WeatherCard.css";

/**
 * Presentational weather card used on the home page.
 * Receives a `weather` object (from OpenWeatherMap) and
 * the current `units` and renders user-friendly information.
 */
function WeatherCard({ weather, units = "metric" }) {
  if (!weather) return null;

  const tempUnit = units === "imperial" ? "°F" : "°C";
  const iconCode = weather.weather?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;

  return (
    <div className="weather-card" role="region" aria-label="Current weather">
      <h2>{weather.name || "Unknown"}</h2>
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">
            {Math.round(weather.main.temp)}{tempUnit}
          </span>
          <span className="weather-desc">
            {weather.weather?.[0]?.description || ""}
          </span>
        </div>
        {iconUrl && <img className="weather-icon" src={iconUrl} alt="weather icon" />}
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{weather.main.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind</span>
          <span className="value">{Math.round(weather.wind.speed)} {units === "imperial" ? "mph" : "m/s"}</span>
        </div>
        <div className="detail">
          <span className="label">Pressure</span>
          <span className="value">{weather.main.pressure} hPa</span>
        </div>
        <div className="detail">
          <span className="label">Feels like</span>
          <span className="value">
            {Math.round(weather.main.feels_like)}{tempUnit}
          </span>
        </div>
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  weather: PropTypes.object,
  units: PropTypes.oneOf(["metric", "imperial"])
};

export default WeatherCard;


