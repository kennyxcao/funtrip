import {NavItem} from 'react-bootstrap';
const React = require('react');

const DestinationItem = (props) => (
  <NavItem eventKey={3 + props.key} href="#">{props.destination.name}</NavItem>
);

export default DestinationItem;