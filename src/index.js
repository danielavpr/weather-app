import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherProvider } from './contexts/weatherContext'

ReactDOM.render(
  <WeatherProvider>
    <App />
  </WeatherProvider>,
  document.getElementById('root')
);
