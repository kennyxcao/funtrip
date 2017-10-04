import React from 'react';
import ObjItem from './ObjItem.jsx';
import ObjModal from './ObjModal.jsx';

const ObjList = (props) => (
  <div className='objective-list'>
    <ObjModal handleObjAdd={props.handleObjAdd} destinations={props.destinations}/>
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
