import React from 'react';

const WeatherCards = ({ forecasts }) => {
  return (
    <div className="days-forecast">
      <h2>5-Day Forecast</h2>
      <ul className="weather-cards">
        {forecasts.map((weatherItem, index) => (
          index !== 0 && (
            <li className="card" key={index}>
              <h3>({weatherItem.dt_txt.split(" ")[0]})</h3>
              <img src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`} alt="weather-icon" />
              <h6>Temp: {(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
              <h6>Wind: {weatherItem.wind.speed} M/S</h6>
              <h6>Humidity: {weatherItem.main.humidity}%</h6>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default WeatherCards;
