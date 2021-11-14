import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { fetchWeather } from '../api/Weather';

const cities = ['Estonia', 'Mexico', 'Sydney', 'Korea'];

const initialState = {
    selectedCity: '',
    citiesWeather: [],
    lastUpdate: '',
};

const ACTIONS = {
    updateCitiesWeather: 'UPDATE_CITIES_WEATHER',
    updateSelectedCity: 'UPDATE_SELECTED_CITY',
};

const updateCitiesWeather = citiesWeather => ({
    type: ACTIONS.updateCitiesWeather,
    citiesWeather,
});

// const updateSelectedCity = city => ({
//     type: ACTIONS.updateSelectedCity,
//     city,
// });

const weatherReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.updateCitiesWeather: {
            return { ...state, citiesWeather: action.citiesWeather };
        }
        case ACTIONS.updateSelectedCity: {
            return { ...state, selectedCity: action.selectedCity };
        }
        default:
            return state;
    }
};

export const WeatherContext = createContext(initialState);
export const useWeather = () => useContext(WeatherContext);
export const WeatherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    useEffect(() => {
        const getWeather = async () => {
            const weatherPromises = cities.map(city => fetchWeather({ city }));
            const weatherResponses = await Promise.all(weatherPromises);
            const weatherFormated = weatherResponses.map(weather => {
                return {
                    name: weather.name,
                    weather: weather.weather,
                    main: weather.main,
                    // datetime: new Date(weather.dt * 1000).toLocaleString(
                    //     'en-US',
                    //     {
                    //         weekday: 'short',
                    //         month: 'long',
                    //         day: 'numeric',
                    //         hour: '2-digit',
                    //         minute: '2-digit',
                    //     }
                    // ),
                    id: weather.id,
                    icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
                    temp: weather.main.temp,
                    description: weather.weather[0].description,
                };
            });
            dispatch(updateCitiesWeather(weatherFormated));
        };
        getWeather();
    }, []);

    return (
        <WeatherContext.Provider
            value={{
                ...state,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};
