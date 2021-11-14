import React from 'react';
import styled, { css } from 'styled-components';

const layout = css`
    height: 300px;
    width: 300px;
    background: red;
`;

const WeatherDetail = ({ className }) => {
    return (
        <div className={className}>
        </div>
    );
};

export default styled(WeatherDetail)`
    ${layout}
`;
