/* eslint-disable no-undef */
export const fetchWeather = ({ lat, lon }) => {
    return fetch(
        `${process.env.REACT_APP_WEATHER_API}/onecall?units=metric&lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${process.env.REACT_APP_WEATHER_KEY}`,
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
