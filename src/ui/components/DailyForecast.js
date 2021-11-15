import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';

const layout = css`
    margin: 48px 0;
    display: inline-block;
    width: 100%;
    .daily {
        &__title {
            font-size: 1.5rem;
            text-align: center;
            margin-bottom: 12px;
        }
        &__list {
            display: flex;
            justify-content: space-between;
        }
    }
`;

const DailyForecastItem = styled.div`
    text-align: center;
    img {
        height: 56px;
    }
`;

const DailyForecast = ({ className }) => {
    const { selectedCity, selectedCityDetail } = useWeather();
    return (
        <div className={className}>
            <div className="daily__title">Next 7 days</div>
            {selectedCityDetail.daily && (
                <div className="daily__list">
                    {selectedCityDetail.daily.map(daily => {
                        return (
                            <DailyForecastItem
                                key={`${selectedCity}-${daily.dt}`}
                            >
                                <img
                                    src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
                                />
                                <div>{daily.weather[0].main}</div>
                                <div>{`min: ${daily.temp.min}°`}</div>
                                <div>{`max: ${daily.temp.max}°`}</div>
                            </DailyForecastItem>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default styled(DailyForecast)`
    ${layout}
`;
