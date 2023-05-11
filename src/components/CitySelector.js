import React, { useState } from 'react';
import cities  from "./CitiesList";
import './CitySelector.scss';

const CitySelector = ({ onSelectCity }) => {

    const [selectedCity, setSelectedCity] = useState('');

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        onSelectCity(selectedCity);
    };

    return (
        <div>
            <label htmlFor="city-select">Выберите город:</label>
            <select id="city-select" value={selectedCity} onChange={handleCityChange}>
                <option value="">Выберите город</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CitySelector;
