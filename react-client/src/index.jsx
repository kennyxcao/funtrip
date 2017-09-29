import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    console.log('App Mounted');
  }

  handleLogin() {

  }

  render () {
    return (<div className='.container-fluid'>
      <nav className="navbar navbar-default bg-faded">
        <h1 id="app-title" className="navbar-brand">FunTrip</h1>
      </nav>
      <div className="col-md-12">
        <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
      </div>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));