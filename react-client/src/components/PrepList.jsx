import React from 'react';
import PrepItem from './PrepItem.jsx';
import PrepModal from './PrepModal.jsx';

const PrepList = (props) => (
  <div className='prep-list'>
    <PrepModal handlePrepAdd={props.handlePrepAdd} users={props.users}/>
    <div> 
      There are {props.preparationItems.length} items to bring
    </div>
    <div>
      {props.preparationItems.map((preparation, index) => 
        <PrepItem 
          preparation={preparation} 
          key={index}
          handlePrepItemChange={props.handlePrepItemChange}
          handlePrepItemDelete={props.handlePrepItemDelete}
        />)}    
    </div>  
  </div>
);

export default PrepList;