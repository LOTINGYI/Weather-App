import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import { WeatherProvider } from './WeatherContext';

ReactDOM.render(
  <WeatherProvider>
      <App />
  </WeatherProvider>,
  document.getElementById('root')
);

