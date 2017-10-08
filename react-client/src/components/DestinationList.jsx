import {Nav, NavDropdown, NavItem} from 'react-bootstrap';
import DestinationItem from './DestinationItem.jsx';
import DestinationModal from './DestinationModal.jsx';

const React = require('react');

const DestinationList = (props) => (
  <div className='destination-list'>
    {!props.loggedIn ? null :
      <Nav>
        <NavItem eventKey={2} href="#" onClick={() => props.handleDestinationSelect()}>Overview</NavItem>
        {props.destinations.map((destination, index) => 
          <DestinationItem 
            destination={destination} 
            key={index} 
            handleDestinationDelete={props.handleDestinationDelete} 
            handleDestinationSelect={props.handleDestinationSelect}
          />
        )}
        <DestinationModal handleDestinationAdd={props.handleDestinationAdd}/>
      </Nav>
    }
  </div>
);

export default DestinationList;