import React from 'react';
import ObjItem from './ObjItem.jsx';
import ObjModal from './ObjModal.jsx';
import {Grid, Row, Col, PageHeader, Navbar, Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
const ObjList = (props) => (
  <div className='objective-list'>
    <ObjModal handleObjAdd={props.handleObjAdd} destinations={props.destinations}/>
    <Navbar>
      <Nav>
        <NavItem eventKey={1} href="#" value='all' onClick={props.handleObjCategorySelect.bind(null, 'all')}>All</NavItem>
        <NavItem eventKey={2} href="#" value='sightseeing' onClick={props.handleObjCategorySelect.bind(null, 'sightseeing')}>Sightseeing</NavItem>
        <NavItem eventKey={3} href="#" value='food' onClick={props.handleObjCategorySelect.bind(null, 'food')}>Food</NavItem>
        <NavItem eventKey={4} href="#" value='activities' onClick={props.handleObjCategorySelect.bind(null, 'activities')}>Activities</NavItem>
      </Nav>
    </Navbar>
    <div> 
      There are {props.objectives.length} things I want to do
    </div>
    <div>
      {props.objectives.map((objective, index) => 
        <ObjItem 
          objective={objective} 
          key={index}
          handleObjItemChange={props.handleObjItemChange}
          handleObjItemDelete={props.handleObjItemDelete}
        />)}    
    </div>  
  </div>
);

export default ObjList;
