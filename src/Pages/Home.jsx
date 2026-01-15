import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { useWeather } from '../hooks/useWeather';
import '../styles/pages/Home.css';

export function Home() {
  const [searchCity, setSearchCity] = useState('London');
  const { weather, loading, error } = useWeather(searchCity);

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  return (
    <div className="home-page">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      
      {loading && <p className="loading">Loading weather data...</p>}
      {error && <p className="error">Error: {error}</p>}
      
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}
