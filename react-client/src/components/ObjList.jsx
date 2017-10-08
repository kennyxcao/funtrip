import React from 'react';
import ObjItem from './ObjItem.jsx';
import ObjModal from './ObjModal.jsx';
import {Tabs, Tab} from 'react-bootstrap';

const ObjList = (props) => (
  <div className='objective-list'>
    <ObjModal handleObjAdd={props.handleObjAdd} destinations={props.destinations}/>
    <hr className='divider'/>    
    <Tabs defaultActiveKey={0} id="obj-category-tabs" onSelect={props.handleObjCategorySelect}>
      <Tab eventKey={0} title='all'></Tab>
      <Tab eventKey={1} title='sightseeing'></Tab>
      <Tab eventKey={2} title='food'></Tab>
      <Tab eventKey={3} title='activities'></Tab>
    </Tabs>
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
