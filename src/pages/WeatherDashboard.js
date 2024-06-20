import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import WeatherInput from '../components/WeatherInput';
import CurrentWeather from '../components/CurrentWeather';
import WeatherCards from '../components/WeatherCards';
// import './WeatherDashboard.css';

const API_KEY = "fb339501cdfb88bcefa2e8f8d12a9d6d";

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    axios.get(WEATHER_API_URL)
      .then(response => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = response.data.list.filter(forecast => {
          const forecastDate = new Date(forecast.dt_txt).getDate();
          if (!uniqueForecastDays.includes(forecastDate)) {
            return uniqueForecastDays.push(forecastDate);
          }
        });

        setWeatherData({
          cityName,
          forecasts: fiveDaysForecast,
        });
        setCity('');
      })
      .catch(() => {
        setError("An error occurred while fetching the weather forecast!");
      });
  };

  const getCityCoordinates = () => {
    if (city.trim() === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

    axios.get(API_URL)
      .then(response => {
        if (!response.data.length) return setError(`No coordinates found for ${city}`);
        const { lat, lon, name } = response.data[0];
        getWeatherDetails(name, lat, lon);
      })
      .catch(() => {
        setError("An error occurred while fetching the coordinates!");
      });
  };

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

        axios.get(API_URL)
          .then(response => {
            const { name } = response.data[0];
            getWeatherDetails(name, latitude, longitude);
          })
          .catch(() => {
            setError("An error occurred while fetching the city name!");
          });
      },
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          setError("Geolocation request denied. Please reset location permission to grant access again.");
        } else {
          setError("Geolocation request error. Please reset location permission.");
        }
      }
    );
  };

  const navigateToLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="container">
      <div>
        <h1>Weather Dashboard</h1>
        <button className='btn btn-success flex' onClick={navigateToLogin}>Login</button>
      </div>
      <WeatherInput
        city={city}
        setCity={setCity}
        getCityCoordinates={getCityCoordinates}
        getUserCoordinates={getUserCoordinates}
      />
      {weatherData && (
        <>
          <CurrentWeather cityName={weatherData.cityName} weatherItem={weatherData.forecasts[0]} />
          <WeatherCards forecasts={weatherData.forecasts} />
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WeatherDashboard;
