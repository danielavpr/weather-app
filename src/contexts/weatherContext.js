import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { fetchWeather } from '../api/Weather';

const cities = [
    {
        name: 'Estonia',
        lon: 25.0136,
        lat: 58.5953,
    },
    {
        name: 'Mexico',
        lon: 120.7198,
        lat: 15.0646,
    },
    {
        name: 'Guadalajara',
        lon: -103.3333,
        lat: 20.6667,
    },
    {
        name: 'Sydney',
        lon: 151.2073,
        lat: -33.8679,
    },
    {
        name: 'Korea',
        lon: 16.7458,
        lat: 53.6059,
    },
];

const initialState = {
    selectedCity: '',
    citiesWeather: [],
    lastUpdate: '',
    selectedCityDetail: {},
};

const ACTIONS = {
    updateCitiesWeather: 'UPDATE_CITIES_WEATHER',
    updateSelectedCity: 'UPDATE_SELECTED_CITY',
    updateSelectedCityDetail: 'UPDATE_SELECTED_CITY_DETAIL',
    updateLastUpdate: 'UPDATE_LAST_UPDATE',
};

const updateCitiesWeather = citiesWeather => ({
    type: ACTIONS.updateCitiesWeather,
    citiesWeather,
});

const updateSelectedCity = selectedCity => ({
    type: ACTIONS.updateSelectedCity,
    selectedCity,
});

const updateSelectedCityDetail = selectedCityDetail => ({
    type: ACTIONS.updateSelectedCityDetail,
    selectedCityDetail,
});

const updateLastUpdate = lastUpdate => ({
    type: ACTIONS.updateLastUpdate,
    lastUpdate,
});

const weatherReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.updateCitiesWeather: {
            return { ...state, citiesWeather: action.citiesWeather };
        }
        case ACTIONS.updateSelectedCity: {
            return { ...state, selectedCity: action.selectedCity };
        }
        case ACTIONS.updateSelectedCityDetail: {
            return { ...state, selectedCityDetail: action.selectedCityDetail };
        }
        case ACTIONS.updateLastUpdate: {
            return { ...state, lastUpdate: action.lastUpdate };
        }
        default:
            return state;
    }
};

export const WeatherContext = createContext(initialState);
export const useWeather = () => useContext(WeatherContext);
export const WeatherState = ({ children }) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    const stateReducers = {
        updateSelectedCity: data => dispatch(updateSelectedCity(data)),
        updateWeather: () => getWeather(),
    };

    const getWeather = async () => {
        const weatherPromises = cities.map(city =>
            fetchWeather({ lon: city.lon, lat: city.lat })
        );
        const weatherResponses = await Promise.all(weatherPromises);
        const weatherFormated = weatherResponses.map((weather, index) => {
            return {
                name: cities[index].name,
                weather: weather.current.weather[0],
                temp: weather.current.temp,
                icon: `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
                description: weather.current.weather[0].description,
                humidity: weather.current.humidity,
                daily: weather.daily,
                hourly: weather.hourly.slice(0, 12),
            };
        });

        const lastUpdate = new Date(
            weatherResponses[0].current.dt * 1000
        ).toLocaleString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        dispatch(updateCitiesWeather(weatherFormated));
        dispatch(updateLastUpdate(lastUpdate));
    };

    useEffect(() => {
        getWeather();
        const cityFromLocal = window.localStorage.getItem('weather-city');
        if (cityFromLocal) {
            dispatch(updateSelectedCity(cityFromLocal));
        }
    }, []);

    useEffect(() => {
        const selectedCityData = state.citiesWeather.find(
            cityWeather => cityWeather.name === state.selectedCity
        );

        if (selectedCityData) {
            dispatch(updateSelectedCityDetail(selectedCityData));
        }
    }, [state.selectedCity, state.citiesWeather]);

    return (
        <WeatherContext.Provider
            value={{
                ...state,
                ...stateReducers,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};
