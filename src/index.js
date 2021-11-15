import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherProvider } from './contexts/WeatherContext';

ReactDOM.render(
    <WeatherProvider>
        <App />
    </WeatherProvider>,
    document.getElementById('root')
);
