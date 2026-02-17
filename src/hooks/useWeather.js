import { useEffect, useState, useRef } from "react";

/**
 * useWeather Hook
 * Handles weather data fetching, geolocation, and state management.
 * Returns weather data, loading/error states, and action functions.
 */
function useWeather(options = {}) {
  const { units = "metric", onWeatherFetch = null } = options;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [currentUnits, setCurrentUnits] = useState(units);

  const mountedRef = useRef(true);
  const abortControllerRef = useRef(null);
  const cacheRef = useRef({});

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  // Check cache (simple TTL-based: 5 minutes)
  const getCache = (key) => {
    const cached = cacheRef.current[key];
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.data;
    }
    delete cacheRef.current[key];
    return null;
  };

  const setCache = (key, data) => {
    cacheRef.current[key] = { data, timestamp: Date.now() };
  };

  // Fetch weather by query (city name or coords)
  const fetchWeatherData = async (url, cacheKey) => {
    // Check cache first
    const cached = getCache(cacheKey);
    if (cached) {
      if (mountedRef.current) {
        setWeather(cached);
        setError(null);
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);

    // Abort previous request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("Weather API key not configured. Set VITE_WEATHER_API_KEY in .env");
      }

      const fullUrl = `${url}&appid=${apiKey}`;
      const response = await fetch(fullUrl, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch weather`);
      }

      const data = await response.json();

      if (mountedRef.current) {
        setWeather(data);
        setCache(cacheKey, data);
        if (onWeatherFetch) onWeatherFetch(data);
      }
    } catch (err) {
      if (err.name !== "AbortError" && mountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  // Fetch by city name
  const fetchByCity = (cityName) => {
    if (!cityName) return;
    const cacheKey = `city_${cityName}_${currentUnits}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&units=${currentUnits}`;
    fetchWeatherData(url, cacheKey);
  };

  // Fetch by coordinates
  const fetchByCoords = (lat, lon) => {
    if (!lat || !lon) return;
    setCoords({ lat, lon });
    const cacheKey = `coords_${lat}_${lon}_${currentUnits}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnits}`;
    fetchWeatherData(url, cacheKey);
  };

  // Request geolocation permission
  const requestLocation = () => {
    setLocationStatus("loading");
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation not supported on this device.");
      setLocationStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (mountedRef.current) {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          setLocationStatus("success");
          fetchByCoords(latitude, longitude);
        }
      },
      (geoError) => {
        if (mountedRef.current) {
          setError(geoError.message || "Location access denied or timeout.");
          setLocationStatus("denied");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      }
    );
  };

  // Update units and re-fetch
  const setUnits = (newUnits) => {
    setCurrentUnits(newUnits);
    // Re-fetch with new units if we have coords
    if (coords) {
      fetchByCoords(coords.lat, coords.lon);
    }
  };

  // Refresh current weather
  const refresh = () => {
    if (coords) {
      fetchByCoords(coords.lat, coords.lon);
    }
  };

  return {
    weather,
    loading,
    error,
    coords,
    locationStatus,
    units: currentUnits,
    fetchByCity,
    fetchByCoords,
    requestLocation,
    setUnits,
    refresh,
  };
}

export default useWeather;



  