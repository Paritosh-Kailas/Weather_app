# Weather App - React + Vite

A modern weather application built with React and Vite.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.jsx   # City search input
│   └── WeatherCard.jsx # Weather display card
├── pages/              # Page components
│   ├── Home.jsx        # Main weather display
│   ├── Calendar.jsx    # Monthly weather calendar
│   └── Settings.jsx    # User settings
├── hooks/              # Custom React hooks
│   └── useWeather.js   # Weather API hook
├── services/           # API service layer
│   └── weatherService.js # API calls
├── styles/             # CSS files
│   ├── pages/
│   ├── SearchBar.css
│   ├── WeatherCard.css
│   └── ...
├── utils/              # Helper functions
│   └── dateHelpers.js  # Date utility functions
├── App.jsx             # Main app component with routing
└── index.css           # Global styles
```

## 🚀 Getting Started

1. **Get an API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

2. **Set Environment Variables**
   - Copy `.env.local` and add your API key:
   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📄 File Breakdown

| File | Purpose |
|------|---------|
| `weatherService.js` | Handles all API requests to OpenWeatherMap |
| `useWeather.js` | Custom hook for fetching weather data |
| `dateHelpers.js` | Utility functions for date formatting |
| `Home.jsx` | Main page with search and weather display |
| `Calendar.jsx` | Monthly calendar view |
| `Settings.jsx` | App settings (temperature units, notifications) |

## 🎨 Features

✅ Search weather by city name
✅ Current weather conditions display
✅ Weather calendar for each month
✅ Settings page for preferences
✅ Responsive design
✅ Error handling

## 🔑 API Details

Using **OpenWeatherMap Free API**:
- Current Weather: `/weather`
- Forecast: `/forecast`
- Geolocation support

## 📱 Pages

1. **Home** - Search and display current weather
2. **Calendar** - View weather patterns by month
3. **Settings** - Configure app preferences
