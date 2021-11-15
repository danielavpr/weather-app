import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';

const layout = css`
    height: 100%;
    width: 100%;
    background: #ede7e3;
    border-radius: 4px;
`;

const WeatherDetail = ({ className }) => {
    const { selectedCity, selectedCityDetail } = useWeather();

    return (
        <div className={className}>
            {selectedCity && (
                <>
                    <div>{`Humidity: ${selectedCityDetail.humidity}%`}</div>
                </>
            )}
        </div>
    );
};

export default styled(WeatherDetail)`
    ${layout}
`;
