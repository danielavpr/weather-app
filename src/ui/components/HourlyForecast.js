import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';

const layout = css`
    margin: 48px 0;
    display: inline-block;
    width: 100%;
    .hourly {
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

const HourlyForecastItem = styled.div`
    height: 30px;
    text-align: center;
    .hourly__item {
        &-temp {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 12px;
        }
        &-day {
            font-size: 1rem;
            margin-bottom: 12px;
        }
        &-hour {
            font-size: 1rem;
        }
    }
`;

const HourlyForecast = ({ className }) => {
    const { selectedCity, selectedCityDetail } = useWeather();
    return (
        <div className={className}>
            <div className="hourly__title">Next 12 hours</div>
            {selectedCityDetail.hourly && (
                <div className="hourly__list">
                    {selectedCityDetail.hourly.map(hourWeather => {
                        const parsedDate = new Date(hourWeather.dt * 1000);
                        return (
                            <HourlyForecastItem
                                key={`${selectedCity}-${hourWeather.dt}`}
                            >
                                <div className="hourly__item-temp">{`${hourWeather.temp}°`}</div>
                                <div className="hourly__item-day">
                                    <div>
                                        {parsedDate.toLocaleString('en-US', {
                                            weekday: 'short',
                                        })}
                                    </div>
                                    <div>
                                        {parsedDate.toLocaleString('en-US', {
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <div className="hourly__item-hour">
                                    {parsedDate.toLocaleString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                </div>
                            </HourlyForecastItem>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default styled(HourlyForecast)`
    ${layout}
`;
