import React from 'react';
import styled, { css } from 'styled-components';
import { useWeather } from '../../contexts/WeatherContext';

const layout = css`
    height: 100%;
    width: 100%;
    background: #ede7e3;
    border-radius: 4px;
    padding: 32px;
    .humidity {
        font-size: 1.8rem;
    }
`;

const HourlyForecast = styled.div`
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

const DailyForecast = styled.div`
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

const WeatherDetail = ({ className }) => {
    const { selectedCity, selectedCityDetail } = useWeather();

    return (
        <div className={className}>
            {selectedCity && (
                <>
                    <div className="humidity">{`Humidity: ${selectedCityDetail.humidity}%`}</div>
                    <HourlyForecast>
                        <div className="hourly__title">Next 12 hours</div>
                        {selectedCityDetail.hourly && (
                            <div className="hourly__list">
                                {selectedCityDetail.hourly.map(hourWeather => {
                                    const parsedDate = new Date(
                                        hourWeather.dt * 1000
                                    );
                                    return (
                                        <HourlyForecastItem
                                            key={`${selectedCity}-${hourWeather.dt}`}
                                        >
                                            <div className="hourly__item-temp">{`${hourWeather.temp}°`}</div>
                                            <div className="hourly__item-day">
                                                <div>
                                                    {parsedDate.toLocaleString(
                                                        'en-US',
                                                        { weekday: 'short' }
                                                    )}
                                                </div>
                                                <div>
                                                    {parsedDate.toLocaleString(
                                                        'en-US',
                                                        { day: 'numeric' }
                                                    )}
                                                </div>
                                            </div>
                                            <div className="hourly__item-hour">
                                                {parsedDate.toLocaleString(
                                                    'en-US',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                    }
                                                )}
                                            </div>
                                        </HourlyForecastItem>
                                    );
                                })}
                            </div>
                        )}
                    </HourlyForecast>
                    <DailyForecast>
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
                    </DailyForecast>
                </>
            )}
        </div>
    );
};

export default styled(WeatherDetail)`
    ${layout}
`;
