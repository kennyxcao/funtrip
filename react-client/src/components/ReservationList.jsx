import {Table} from 'react-bootstrap';
import ReservationItem from './ReservationItem.jsx';
import ReservationModal from './ReservationModal.jsx';

const React = require('react');

const ReservationList = (props) => (
  <div className='reservation-list'>
    <ReservationModal handleReservationAdd={props.handleReservationAdd} destinations={props.destinations}/>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Name</th>
          <th>Reference #</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.reservations.map((reservation, index) => <ReservationItem reservation={reservation} key={index} handleReservationDelete={props.handleReservationDelete}/>)}
      </tbody>
    </Table>
  </div>
);


export default ReservationList;