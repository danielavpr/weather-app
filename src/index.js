import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherState } from './contexts/WeatherContext';

ReactDOM.render(
    <WeatherState>
        <App />
    </WeatherState>,
    document.getElementById('root')
);
