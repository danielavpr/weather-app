import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';

const layout = css`
    height: 100%;
    width: 100%;
    background: #ede7e3;
    border-radius: 4px;
    padding: 32px;
    .humidity {
        font-size: 1.5rem;
    }
`;

const WeatherDetail = ({ className }) => {
    const { selectedCity, selectedCityDetail } = useWeather();

    return (
        <div className={className}>
            {selectedCity && (
                <>
                    <div className="humidity">{`Humidity: ${selectedCityDetail.humidity}%`}</div>
                    <HourlyForecast />
                    <DailyForecast />
                </>
            )}
        </div>
    );
};

export default styled(WeatherDetail)`
    ${layout}
`;
