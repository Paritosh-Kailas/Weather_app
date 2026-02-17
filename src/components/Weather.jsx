import { useState } from "react";
import useWeather from "../hooks/useWeather";
import WeatherCard from "./WeatherCard";
import Search from "./Search";
import "../styles/WeatherCard.css";

/**
 * Weather Component
 * Main component that displays current weather and handles user interactions.
 * Uses the useWeather hook for all data fetching and state management.
 */
export default function Weather() {
  const [showSearch, setShowSearch] = useState(false);
  const { weather, loading, error, locationStatus, units, fetchByCity, requestLocation, setUnits, refresh } = useWeather();

  const handleSearch = (cityName) => {
    fetchByCity(cityName);
    setShowSearch(false);
  };

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
  };

  // Loading state: initial load
  if (loading && !weather) {
    return (
      <div className="weather-container">
        <p>Loading weather data...</p>
      </div>
    );
  }

  // Error state
  if (error && !weather) {
    return (
      <div className="weather-container error">
        <p>⚠️ {error}</p>
        <button onClick={requestLocation}>Try Using My Location</button>
        <button onClick={() => setShowSearch(true)}>Search for a City</button>
      </div>
    );
  }

  // No data yet: show CTA
  if (!weather) {
    return (
      <div className="weather-container welcome">
        <h2>Weather App</h2>
        <p>Get started by allowing location access or searching for a city.</p>
        <div className="cta-buttons">
          <button onClick={requestLocation} disabled={locationStatus === "loading"}>
            {locationStatus === "loading" ? "Detecting location..." : "Use My Location"}
          </button>
          <button onClick={() => setShowSearch(true)}>Search for a City</button>
        </div>
      </div>
    );
  }

  // Weather data available: show card
  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1>{weather.name || "Unknown Location"}</h1>
        <div className="weather-controls">
          <button onClick={refresh} disabled={loading} title="Refresh weather">
            🔄
          </button>
          <button onClick={() => setShowSearch(true)} title="Search city">
            🔍
          </button>
          <select value={units} onChange={(e) => handleUnitChange(e.target.value)} title="Change units">
            <option value="metric">°C (metric)</option>
            <option value="imperial">°F (imperial)</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading-indicator">Updating...</p>}

      <WeatherCard weatherData={weather} units={units} />

      {error && <p className="error-text">Note: {error}</p>}

      {showSearch && (
        <div className="search-overlay">
          <Search onSearch={handleSearch} onClose={() => setShowSearch(false)} />
        </div>
      )}
    </div>
  );
}
