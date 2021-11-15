import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from 'semantic-ui-react';

const layout = css`
    padding: 12px !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    .card {
        &__weather {
            min-width: 80px;
            text-align: center;
            img {
                height: 48px;
                width: 48px;
            }
            p {
                font-size: 0.8rem;
                color: grey;
            }
        }
        &__temp {
            min-width: 80px;
            font-size: 1.5rem;
            text-align: center;
        }
        &__details {
            min-width: 120px;
            &-city {
                font-size: 1.2rem;
            }
            &-date {
                color: grey;
            }
        }
    }

    @media (max-width: 1200px) {
        flex-direction: column !important;
    }
`;

const WeatherCard = ({ className, weather, isSelected, onClick }) => {
    return (
        <Card
            className={className}
            onClick={() => onClick(weather.name)}
            color={isSelected ? 'orange' : undefined}
        >
            <div className="card__weather">
                <img src={weather.icon} />
                <p>{weather.description}</p>
            </div>
            <div className="card__temp">{weather.temp}°</div>
            <div className="card__details">
                <div className="card__details-city">{weather.name}</div>
            </div>
        </Card>
    );
};

export default styled(WeatherCard)`
    ${layout}
`;
