import React from 'react';

const Logout = (props) => (
  <div>
    {!props.loggedIn ? null : 
      <div className='logout'>
        <h4>Welcome Back {props.user.toUpperCase()}!</h4>
        <button type="button" className="btn btn-primary" onClick={props.handleLogout}>Logout</button> 
      </div>
    }
  </div>
);

export default Logout;
