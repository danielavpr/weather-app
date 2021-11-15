import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import WeatherDetail from '../components/WeatherDetail';

const layout = css`
    display: flex;
    height: 100%;
    margin-bottom: 0;
    width: 80%;
    margin: auto;
`;

const WeatherCardsContainer = styled.div`
    flex: 0.7;
    padding: 32px 0 32px 32px;
`;

const WeatherDetailContainer = styled.div`
    flex: 1;
    padding: 32px 32px 32px 0;
`;

const WeatherCardRow = styled.div`
    // background: red;
    display: flex;
    &:not(:last-child) {
        margin-bottom: 12px;
    }
    ${WeatherCard} {
        width: 90% !important;
        margin: 0;
    }
`;

const Selected = styled.div`
    // background: green;
    // height: 100%;
    // width: 10%;
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;

    border-right: 30px solid #ede7e3;
    // padding-bottom: 1rem;
    margin: auto 0 auto auto;
`;

const Weather = ({ className }) => {
    const { citiesWeather, selectedCity, updateSelectedCity } = useWeather();

    const updateSelectedCityOnClick = selectedCity => {
        updateSelectedCity(selectedCity);
    };

    return (
        <div className={className}>
            <WeatherCardsContainer>
                {citiesWeather.map((cityWeather, index) => {
                    const cityIsSelected = selectedCity === cityWeather.name;
                    return (
                        <WeatherCardRow
                            key={`weather-${cityWeather.name}-0${index}`}
                        >
                            <WeatherCard
                                weather={cityWeather}
                                onClick={updateSelectedCityOnClick}
                                isSelected={cityIsSelected}
                            />
                            {cityIsSelected && <Selected />}
                        </WeatherCardRow>
                    );
                })}
            </WeatherCardsContainer>
            <WeatherDetailContainer>
                <WeatherDetail />
            </WeatherDetailContainer>
        </div>
    );
};

export default styled(Weather)`
    ${layout}
`;
