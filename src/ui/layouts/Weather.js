import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import WeatherDetail from '../components/WeatherDetail';

const layout = css`
    display: flex;
    height: 100vh;
    width: 80%;
    margin: auto;
    ${WeatherDetail} {
        flex: 1;
    }
`;

const WeatherCardsContainer = styled.div`
    flex: 0.7;
    background: yellow;
    padding: 32px;
`;

const Weather = ({ className }) => {
    const { citiesWeather } = useWeather();
    return (
        <div className={className}>
            <WeatherCardsContainer>
                {citiesWeather.map(cityWeather => {
                    return (
                        <WeatherCard
                            key={cityWeather.id}
                            weather={cityWeather}
                        />
                    );
                })}
            </WeatherCardsContainer>
            <WeatherDetail />
        </div>
    );
};

export default styled(Weather)`
    ${layout}
`;
