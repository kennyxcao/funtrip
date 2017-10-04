import ReservationItem from './ReservationItem.jsx';
const React = require('react');


class ReservationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testData: testData
    };
  }

  render() {
    return (
     <div>
    <h3>Reservations</h3>
      <div className="res">
        <div className="res-table">
          <div className="res-header res-row">
            <div className="res-data">Date</div>
            <div className="res-data">Time</div>
            <div className="res-data">Type</div>
            <div className="res-data">Name</div>
            <div className="res-data">Reference #</div>
          </div>
  {console.log(this.props.items)}
            {this.props.items.map((el, index) => <ReservationItem item = {el} key = {index}/>)}
        </div>
      </div>
  </div>
    );
  }

}

export default ReservationList;