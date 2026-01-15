import '../styles/WeatherCard.css';

export function WeatherCard({ weather }) {
  if (!weather) {
    return <div className="weather-card">No data available</div>;
  }

  const { main, weather: conditions, wind, clouds } = weather;

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{Math.round(main.temp)}°C</span>
          <span className="weather-desc">{conditions[0].main}</span>
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${conditions[0].icon}@2x.png`}
          alt={conditions[0].main}
          className="weather-icon"
        />
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="label">Feels Like</span>
          <span className="value">{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="detail">
          <span className="label">Humidity</span>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind Speed</span>
          <span className="value">{wind.speed} m/s</span>
        </div>
        <div className="detail">
          <span className="label">Cloudiness</span>
          <span className="value">{clouds.all}%</span>
        </div>
      </div>
    </div>
  );
}
