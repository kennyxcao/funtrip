import React from 'react';
import Moment from 'react-moment';

class CurrentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='current-info'>
        <h3> Current Information </h3>
        <hr className='divider'/>
        <p> Current TripId: {this.props.trip._id} </p>
        <p> Trip Dates: <Moment format='YYYY/MM/DD' date={this.props.startDate}/> - <Moment format='YYYY/MM/DD' date={this.props.endDate}/></p>
        <p> Weather Info : its hot </p>
        <p> Currency Info : it's expensive </p>
      </div>
    );
  }
}

export default CurrentInfo;