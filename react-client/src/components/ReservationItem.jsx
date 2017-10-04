import Moment from 'react-moment';
const React = require('react');

const ReservationItem = (props) => (
  <tr>
    <td><Moment format='YYYY/MM/DD' date={props.reservation.date}/></td>
    <td>{props.reservation.category}</td>
    <td>{props.reservation.name}</td>
    <td>{props.reservation.referenceNumber}</td>
  </tr>
);

export default ReservationItem;