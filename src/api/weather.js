/* eslint-disable no-undef */
export const fetchWeather = ({ city }) => {
    return fetch(
        `${process.env.REACT_APP_WEATHER_API}q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`,
        { method: 'GET' }
    )
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(response => response)
        .catch(error => {
            console.error('FETCH PROJECT DETAIL ERROR ', error);
        });
};
