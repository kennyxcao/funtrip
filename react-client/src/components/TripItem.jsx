import {MenuItem} from 'react-bootstrap';
const React = require('react');

const TripItem = (props) => (
  <MenuItem eventKey={1 + +props.key * 0.1}>{props.trip.name}</MenuItem>
);

export default TripItem;