import {} from 'react-bootstrap';
const React = require('react');

const KtoF = (kelvin) => {
  return (kelvin * 9 / 5 - 459.67).toFixed(1);
};

const WeatherInfo = (props) => (
  <div className='weather-item'>
    <p>
      <span className='bold'>{props.weather.name}</span> &mdash;
      <img src={`http://openweathermap.org/img/w/${props.weather.weather[0].icon}.png`} alt={props.weather.weather[0].description} />
      Temp: {KtoF(props.weather.main.temp)}°F, &ensp;
      Min T: {KtoF(props.weather.main.temp_min)}°F, &ensp;
      Max T: {KtoF(props.weather.main.temp_max)}°F, &ensp;
      Humidity: {props.weather.main.humidity}%
    </p>
  </div>
);

export default WeatherInfo;