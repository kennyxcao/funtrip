import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pw: ''
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange (e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange (e) {
    this.setState({pw: e.target.value});
  }

  getLoginData (e) {
    this.props.handleLogin({name: this.state.username, pw: this.state.pw});
    this.setState({
      username: '',
      pw: ''
    });
  }

  render() {
    return (
      <div>
        {this.props.loggedIn ? null :
        <div className='login'>
          <h4>Login Page</h4>
          <form>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" value={this.state.pw} onChange={this.handlePasswordChange} />
            <button type="button" className="btn btn-primary" onClick={this.getLoginData}>Login</button>
          </form>
        </div>
      }
  </div>);
  }
}


// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
Login.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  handleLogin: React.PropTypes.func.isRequired
};

export default Login;
