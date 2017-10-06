import {Navbar, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon} from 'react-bootstrap';

import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pw: ''
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.getSignupData = this.getSignupData.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      username: '',
      pw: ''
    });
  }

  handleUsernameChange (e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange (e) {
    this.setState({pw: e.target.value});
  }

  getLoginData (e) {
    this.props.handleLogin({username: this.state.username, pw: this.state.pw});
    this.resetState();
  }

  getSignupData (e) {
    this.props.handleSignup({username: this.state.username, pw: this.state.pw});
    this.resetState();
  }

  render() {
    return (
      <div className='login'>
        {this.props.loggedIn ? null :
        <Navbar.Form pullLeft>
          <FormGroup controlId='username'>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type='text'
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type='password'
              value={this.state.pw}
              onChange={this.handlePasswordChange}
            />
          </FormGroup>
          <Button bsStyle="primary" bsSize="small" onClick={this.getLoginData}>Login</Button>
          <Button bsStyle="primary" bsSize="small" onClick={this.getSignupData}>Signup</Button>          
        </Navbar.Form>
        }
      </div>
    );
  }
}

export default Login;
