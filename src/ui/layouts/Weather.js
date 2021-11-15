import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';
import { Button, Icon } from 'semantic-ui-react';
import WeatherCard from '../components/WeatherCard';
import WeatherDetail from '../components/WeatherDetail';

const layout = css`
    display: flex;
    height: 100%;
    margin-bottom: 0;
    width: 90%;
    margin: auto;
`;

const WeatherCardsContainer = styled.div`
    flex: 0.5;
    padding: 32px 0 32px 32px;
    .cards {
        &__update {
            display: flex;
            justify-content: space-between;
            margin-right: 35px;
            align-items: baseline;
            margin-bottom: 12px;
            font-style: italic;
        }
    }
`;

const WeatherDetailContainer = styled.div`
    flex: 1;
    padding: 32px 32px 32px 0;
`;

const WeatherCardRow = styled.div`
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
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-bottom: 30px solid transparent;
    border-right: 30px solid #ede7e3;
    margin: auto 0 auto auto;
`;

const Weather = ({ className }) => {
    const {
        citiesWeather,
        selectedCity,
        lastUpdate,
        updateSelectedCity,
        updateWeather,
    } = useWeather();

    const updateSelectedCityOnClick = selectedCity => {
        window.localStorage.setItem('weather-city', selectedCity);
        updateSelectedCity(selectedCity);
    };

    return (
        <div className={className}>
            <WeatherCardsContainer>
                <div className="cards__update">
                    <p>{`Last update: ${lastUpdate}`}</p>
                    <Button icon onClick={updateWeather}>
                        <Icon name="sync" />
                    </Button>
                </div>
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
