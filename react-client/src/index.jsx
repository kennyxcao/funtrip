import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import PrepList from './components/PrepList.jsx';
import ObjList from './components/ObjList.jsx';
import CurrentInfo from './components/CurrentInfo.jsx';
import ReservationList from './components/ReservationList.jsx';
import MapView from './components/MapView.jsx';
import Reservations from './components/ReservationList.jsx';
import SideBar from './components/SideBar.jsx';

var sidebarTestData = [{location:'Paris'}, {location: 'San Francisco'}, {location: 'Alaska'}];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: '',
      sideBarOn: true
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);    
  }

  componentDidMount() {
    console.log('App Mounted');
    this.handleLogin();
  }

  handleLogin(loginInfo) {
    $.ajax({
      type: 'POST',
      url: '/login', 
      data: loginInfo ? JSON.stringify(loginInfo) : JSON.stringify({username: null}),
      contentType: 'application/json',
      success: (results, status, xhr) => {
        if (results.username) {
          console.log('Sucessiful Login');
          this.setState({
            loggedIn: true,
            user: results.username
          });          
        } else {
          console.log('Incorrect Login');          
        }
      },
      error: (xhr, status, error) => {
        console.error('Login Error');
        console.error(xhr, status, error);        
      }
    });  
  }

  handleLogout (e) {
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: (results, status, xhr) => {
        console.log('Sucessiful Logout');
        this.setState({
          loggedIn: false,
          user: ''
        });
      },
      error: (xhr, status, error) => {
        console.error('Logout Failed');
        console.error(xhr, status, error);        
      }
    });
  }  

  render () {
    return (
      
    <div className='.container-fluid'>
      <nav className='navbar navbar-default bg-faded'>
        <h1 id="app-title" className="navbar-brand">FunTrip</h1>
      </nav>
      <div className='col-md-12'>
        <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
        <Logout loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout} />
      </div>
      <button type="button" className="btn btn-primary" onClick = {() => { this.setState({sideBarOn: !this.state.sideBarOn}); }}>
      <i class="glyphicon glyphicon-align-left"></i>
      Toggle Sidebar
      </button>
      {this.state.sideBarOn ? <SideBar testData = {sidebarTestData} userName = {'user1'} /> : null}
      <div className="main col-md-12">
        <CurrentInfo/>
        <ReservationList/>
        <PrepList />
        <ObjList />
        <MapView />
      </div>
    </div>


    );

  }
}


ReactDOM.render(<App />, document.getElementById('app'));
