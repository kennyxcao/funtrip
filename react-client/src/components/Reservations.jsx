import ReservationItem from './ReservationItem.jsx'
const React = require('react');
const testData = [{
  date: '12/25/2017',
  time: '12:30PM',
  type: 'Flight',
  name: 'SouthWest',
  'reference': '1341AG4'
},
	{
  date: '12/26/2017',
  time: '1:45PM',
  type: 'Hotel',
  name: 'HotelMotelHolidayInn',
  'reference': '123456'
},

{
  date: '12/27/2017',
  time: '9:30AM',
  type: 'Rental',
  name: 'Enterprise',
  'reference': '89ASDF7'
},
{
  date: '12/28/2017',
  time: '6:30PM',
  type: 'Train',
  name: 'BartExpress',
  'reference': '442'
}

];
class Reservations extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			testData: testData
		};
	}

	render(){
		return(
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
            {this.state.testData.map((el,index) => <ReservationItem item = {el} key = {index}/>)}
        </div>
      </div>
  </div>
		)
	}

}

export default Reservations;