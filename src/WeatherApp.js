import React, { useState } from 'react';
import CitySelector from './components/CitySelector';
import './WeatherApp.scss';

const WeatherApp = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleCitySelect = (city) => {
        setSelectedCity(city);

        const apiKey = '6c2687bba383ccba571e989dd7ea8a8b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных о погоде:', error);
            });
    };

    const getWeatherIcon = (temperature) => {
        if (temperature > 20) {
            return 'icon-hot';
        } else if (temperature >= 15 && temperature <= 20) {
            return 'icon-warm';
        } else if (temperature >= 5 && temperature < 15) {
            return 'icon-cool';
        } else if (temperature >= 0 && temperature < 5) {
            return 'icon-cold';
        } else {
            return 'icon-very-cold';
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <CitySelector onSelectCity={handleCitySelect} />
            {weatherData && (
                <div className="weather-data">
                    <div className="weather-icon">
                        {/* icon */}
                        <i className={getWeatherIcon(Math.round(weatherData.main.temp))} />
                    </div>
                    <div className="weather-info">
                        <div className="weather-info-item">
                            <span className="label">Дата:</span>
                            <span>{new Date(weatherData.dt * 1000).toLocaleDateString()}</span>
                        </div>
                        <div className="weather-info-item">
                            <span className="label">Город:</span>
                            <span>{weatherData.name}</span>
                        </div>
                        <div className="weather-info-item">
                            <span className="label">Погода:</span>
                            <span>{weatherData.weather[0].description}</span>
                        </div>
                        <div className="weather-info-item">
                            <span className="label">Температура:</span>
                            <span>{Math.round(weatherData.main.temp)}°C</span>
                        </div>
                        <div className="weather-info-item">
                            <span className="label">Ветер:</span>
                            <span>{weatherData.wind.speed} м/с</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
