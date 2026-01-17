import { useEffect, useState } from "react";



function Weather() {
  const [locationStatus, setLocationStatus] = useState("idle");
  const [coords, setCoords] = useState(null);

  const [weatherStatus, setWeatherStatus] = useState("idle");
  const [weatherData, setWeatherData] = useState(null);

  // 1️⃣ Get user location ONCE when component mounts
  useEffect(() => {
    setLocationStatus("loading");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationStatus("success");
      },
      () => {
        setLocationStatus("denied");
      }
    );
  }, []);

  // 2️⃣ Fetch weather when coordinates are available
  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      setWeatherStatus("loading");

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=YOUR_API_KEY`
        );

        const data = await response.json();
        setWeatherData(data);
        setWeatherStatus("success");
      } catch (error) {
        setWeatherStatus("error");
      }
    };

    fetchWeather();
  }, [coords]);

  // 3️⃣ UI rendering
  if (locationStatus === "loading") {
    return <p>Getting your location...</p>;
  }

  if (locationStatus === "denied") {
    return <p>Location permission denied.</p>;
  }

  if (locationStatus === "error") {
    return <p>Location not supported.</p>;
  }

  if (weatherStatus === "loading") {
    return <p>Fetching weather...</p>;
  }

  if (weatherStatus === "error") {
    return <p>Failed to fetch weather.</p>;
  }

  if (weatherStatus === "success") {
    return (
      <div>
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Condition: {weatherData.weather[0].description}</p>
      </div>
    );
  }

  return null;
}

export default Weather;


  