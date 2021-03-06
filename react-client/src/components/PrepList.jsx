import React from 'react';
import PrepItem from './PrepItem.jsx';
import PrepModal from './PrepModal.jsx';

const PrepList = (props) => (
  <div className='prep-list'>
    <PrepModal handlePrepAdd={props.handlePrepAdd} users={props.users}/>
    <hr className='divider'/>
    <div> 
      There are {props.preparationItems.length} items to bring
    </div>
    <div>
      {props.preparationItems.map((preparation, index) => 
        <PrepItem 
          key={index}
          preparation={preparation} 
          handlePrepItemChange={props.handlePrepItemChange}
          handlePrepItemDelete={props.handlePrepItemDelete}
          users={props.users}
        />)}    
    </div>  
  </div>
);

export default PrepList;