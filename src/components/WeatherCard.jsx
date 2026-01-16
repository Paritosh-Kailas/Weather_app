import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function WeatherCard() {
    const [search, setSearch] = useState(null);
    const [weather, setWeather] = useState(null);  // Added missing weather state
    const [error, setError] = useState(null);  // Lowercased for convention
    const [loading, setLoading] = useState(false);

    const loadOptions = async (inputValue) => {  // Made async for proper promise handling
        if (!inputValue) {
            return { options: [] };  // Return empty options for no input
        }
        setLoading(true);
        try {
            const response = await fetch(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,  // Ensure this matches your .env.local (add if missing)
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                    }
                }
            );
            const data = await response.json();
            return {
                options: data.data.map(city => ({
                    value: city.id,
                    label: `${city.name}, ${city.countryCode}`
                })),
                hasMore: false
            };
        } catch (err) {
            setError(err.message);
            return { options: [] };
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = async (selectedOption) => {
        setSearch(selectedOption);
        if (selectedOption) {
            setLoading(true);
            try {
                const weatherResponse = await fetch(
                    `${import.meta.env.VITE_WEATHER_API_URL}/weather?q=${selectedOption.label.split(',')[0]}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
                );
                const weatherData = await weatherResponse.json();
                setWeather(weatherData);
                setError(null);
            } catch (err) {
                setError("Failed to fetch weather");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <AsyncPaginate
                placeholder="Search for a city..."
                loadOptions={loadOptions}
                onChange={handleCityChange}  // Changed to call handleCityChange
                value={search}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    {/* Add more stats as needed, e.g., humidity, wind */}
                </div>
            )}
        </div>
    );
}

export default WeatherCard;


