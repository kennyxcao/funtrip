import {Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import DestinationItem from './DestinationItem.jsx';
import DestinationModal from './DestinationModal.jsx';

const React = require('react');

const DestinationList = (props) => (
  <div className='desination-list'>
    {!props.loggedIn ? null :
      <Nav>
        <NavItem eventKey={2} href="#">Overview</NavItem>
        {props.destinations.map((destination, index) => <DestinationItem destination={destination} key={index} handleDestinationDelete={props.handleDestinationDelete} />)}
        <DestinationModal handleDestinationAdd={props.handleDestinationAdd}/>
      </Nav>
    }
  </div>
);

export default DestinationList;