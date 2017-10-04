import {Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import TripItem from './TripItem.jsx';

const React = require('react');

const TripList = (props) => (
  <div className='trip-list'>
    {!props.loggedIn ? null :
      <Nav pullRight>
        <NavDropdown eventKey={1} title="My Trips" id="basic-nav-dropdown">
          {props.trips.map((trip, index) => <TripItem trip={trip} key={index}/>)}
        </NavDropdown>
      </Nav>
    }
  </div>
);

export default TripList;