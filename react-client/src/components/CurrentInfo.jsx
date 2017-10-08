import React from 'react';
import Moment from 'react-moment';
import WeatherInfo from './WeatherInfo.jsx';

const CurrentInfo = (props) => (
  <div className='current-info'>
    <h3> Current Information </h3>
    <hr className='divider'/>
    <p><span className='bold'>Current TripId: &ensp;</span>{props.trip._id}</p>
    <p><span className='bold'>Trip Dates: &ensp;</span><Moment format='YYYY/MM/DD' date={props.startDate}/> - <Moment format='YYYY/MM/DD' date={props.endDate}/></p>
    
    <div className='weather-infos'>
      <p> <span className='bold'>Current Weather:</span></p>
      {props.weathers.map((weather, index) => <WeatherInfo key={index} weather={weather} />)}
    </div>

    <div className='currency-info'>
      <p><span className='bold'>Currency Info :</span></p>
    </div>
  </div>
);

export default CurrentInfo;