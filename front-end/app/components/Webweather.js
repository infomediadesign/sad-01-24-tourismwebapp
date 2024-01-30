'use client';
import React, { useState, useEffect } from 'react';
// import { TbTemperatureCelsius } from "react-icons/tb";
// import { FaCloud, FaTint } from 'react-icons/fa';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=valletta&appid=0e93c77502c1ddc4802a0937111ae25b'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    fetchWeatherData();
  }, []); // Make the request only once when the component mounts

  const kelvinToCelsius = (kelvin) => kelvin - 273.15;

  return (
    <div className="bg-blue-500 rounded-lg p-4 text-white ml-auto">
      {weatherData && (
        <div>
          <h2 className="font-bold">Weather in {weatherData.name}</h2>
          <p className="flex items-center">
            <span className="mr-2 text-2xl">&#9729;</span>{weatherData.clouds.all}%
          </p>
          <p className="flex items-center">
            <span className="mr-2 text-2xl">&#x1F321;</span>{kelvinToCelsius(weatherData.main.temp).toFixed(2)} °C
          </p>
          <p className="flex items-center">
            <span className="mr-2 text-2xl">&#x1F4A7;</span>{weatherData.main.humidity}%
          </p>
          {/* Add more weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
