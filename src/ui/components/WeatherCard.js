import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from 'semantic-ui-react';

const layout = css`
    height: 120px;
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    img {
        height: 80px;
        width: 80px;
    }
    .card {
        &__details {
            flex: 1;
            &-city {
                font-size: 1.3rem;
            }
            &-date {
                color: grey;
            }
        }
        &__temp {
            flex: 0.5;
            font-size: 2.3rem;
        }
    }
`;

const WeatherCard = ({ className, weather }) => {
    return (
        <Card className={className}>
            <img src={weather.icon} />
            <div className="card__details">
                <div className="card__details-city">{weather.name}</div>
                <div className="card__details-date">{weather.datetime}</div>
            </div>
            <div className="card__temp">{weather.temp}°</div>
        </Card>
    );
};

export default styled(WeatherCard)`
    ${layout}
`;
