import {Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import TripItem from './TripItem.jsx';
import TripAddModal from './TripAddModal.jsx';
import TripJoinModal from './TripJoinModal.jsx';

const React = require('react');

const TripList = (props) => (
  <div className='trip-list'>
    {!props.loggedIn ? null :
      <Nav pullRight>
        <NavDropdown eventKey={1} title="My Trips" id="basic-nav-dropdown">
          {props.trips.map((trip, index) => <TripItem trip={trip} key={index} handleTripDelete={props.handleTripDelete} handleTripSelect={props.handleTripSelect}/>)}
          <MenuItem divider />
          <TripAddModal handleTripAdd={props.handleTripAdd} />
          <TripJoinModal handleTripJoin={props.handleTripJoin} />
        </NavDropdown>
      </Nav>
    }
  </div>
);

export default TripList;