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

  const handleToggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  const handleCitySelect = (cityName) => {
    fetchByCity(cityName);
    setShowSearch(false);
  };

  // Loading state: initial data fetch
  if (loading && !weather) {
    return (
      <div className="loading-overlay">
        <p>Loading weather data...</p>
      </div>
    );
  }

  // Error state with no cached data
  if (error && !weather) {
    return (
      <div className="error-overlay">
        <p>Error: {error}</p>
        <button onClick={requestLocation} aria-label="Request location permission">Try Location Again</button>
        <button onClick={handleToggleSearch} aria-label="Open city search">Search for a City</button>
      </div>
    );
  }

  // Welcome state: no data yet
  if (!weather) {
    return (
      <div className="weather-container welcome">
        <h1>Weather App</h1>
        <p>Get started by choosing an option below:</p>
        <div className="welcome-buttons">
          <button 
            onClick={requestLocation} 
            disabled={locationStatus === "loading"}
            aria-label="Use device location"
          >
            {locationStatus === "loading" ? "Detecting location..." : "Use My Location"}
          </button>
          <button 
            onClick={handleToggleSearch}
            aria-label="Search for a city"
          >
            Search for a City
          </button>
        </div>
        {showSearch && <Search onCitySelect={handleCitySelect} />}
      </div>
    );
  }

  // Main weather display
  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1>{weather.name || "Unknown Location"}</h1>
        <div className="controls" role="toolbar" aria-label="Weather controls">
          <button 
            onClick={handleToggleSearch}
            aria-label="Toggle city search"
            title="Search for a city"
          >
            {showSearch ? "Close Search" : "Search"}
          </button>
          <button 
            onClick={refresh}
            disabled={loading}
            aria-label="Refresh weather data"
            title="Refresh weather"
          >
            🔄 Refresh
          </button>
          <select 
            value={units} 
            onChange={(e) => setUnits(e.target.value)}
            aria-label="Temperature units"
          >
            <option value="metric">°C (Celsius)</option>
            <option value="imperial">°F (Fahrenheit)</option>
          </select>
        </div>
      </div>

      {loading && <p className="loading-indicator" role="status">Updating weather...</p>}
      {showSearch && <Search onCitySelect={handleCitySelect} />}
      {weather && <WeatherCard weather={weather} units={units} />}
      {error && <p className="error-text" role="alert">Note: {error}</p>}
    </div>
  );
}



  