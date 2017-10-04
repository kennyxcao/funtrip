import {Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import DestinationItem from './DestinationItem.jsx';

const React = require('react');

const DestinationList = (props) => (
  <div className='desination-list'>
    {!props.loggedIn ? null :
      <Nav>
        <NavItem eventKey={2} href="#">Overview</NavItem>
        {props.destinations.map((destination, index) => <DestinationItem destination={destination} key={index}/>)}
      </Nav>
    }
  </div>
);

export default DestinationList;