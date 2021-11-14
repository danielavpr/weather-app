import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from 'semantic-ui-react';

const layout = css`
    padding: 12px !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    .card {
        &__weather {
            flex: 0.5;
            text-align: center;
            img {
                height: 56px;
                width: 56px;
            }
            p {
                font-size: 0.8rem;
                color: grey;
            }
        }
        &__temp {
            flex: 0.8;
            font-size: 2.5rem;
            text-align: center;
        }
        &__details {
            flex: 1;
            &-city {
                font-size: 1.3rem;
            }
            &-date {
                color: grey;
            }
        }
    }
`;

const WeatherCard = ({ className, weather }) => {
    return (
        <Card className={className}>
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
