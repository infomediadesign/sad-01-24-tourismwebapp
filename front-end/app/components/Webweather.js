'use client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    // Subscribe to weather updates
    socket.on('weatherUpdate', (data) => {
      setWeatherData(data);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Weather Forecast</h2>
      {weatherData ? (
        <div>
          <p>Date: {weatherData.date}</p>
          <p>Day: {weatherData.day}</p>
          <p>Time: {weatherData.time}</p>
          <p>Weather Report: {weatherData.weatherReport}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
