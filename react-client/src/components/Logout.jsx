import {Button, Glyphicon} from 'react-bootstrap';
import React from 'react';

const Logout = (props) => (
  <div>
    {!props.loggedIn ? null : 
      <div className='logout'>
        <h4>Welcome Back {props.user.toUpperCase()}! <Button bsStyle='primary' bsSize='small' onClick={props.handleLogout}><Glyphicon glyph='log-out' /></Button></h4>
      </div>
    }
  </div>
);

export default Logout;
