import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, PageHeader, Navbar, Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import $ from 'jquery';
import _ from 'lodash';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import PrepList from './components/PrepList.jsx';
import ObjList from './components/ObjList.jsx';
import ReservationList from './components/ReservationList.jsx';
import TripList from './components/TripList.jsx';
import DesinationList from './components/DestinationList.jsx';
import CurrentInfo from './components/CurrentInfo.jsx';
import MapView from './components/MapView.jsx';
import SideBar from './components/SideBar.jsx';

var sidebarTestData = [{location: 'Paris'}, {location: 'San Francisco'}, {location: 'Alaska'}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      trips: [],
      lastTrip: {destinations: [], reservations: [], preparationItems: [], objectives: []},
      loggedIn: false,
      sideBarOn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);    
    this.handleObjAdd = this.handleObjAdd.bind(this);
    this.handleAddReservation = this.handleAddReservation.bind(this);
  }

  componentDidMount() {
    console.log('App Mounted');
    this.handleLogin();
  }

  updateStateForTrips() {
    //upon signing in, retrieves data for the user and rerenders trips and lastTrip
    $.ajax({
      method: 'POST',
      url: '/trips', 
      data: JSON.stringify({userName: this.state.user}),
      contentType: 'application/json',
      success: (results) => {
        console.log('success ', results);
        this.setState({trips: results.trips, lastTrip: results.lastTrip});
      },
      error: (error) => {
        console.error('Trips Error');
        console.error(error);        
      }
    });  
   
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
          //call next function to get username 
          this.updateStateForTrips();        
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

  handleObjAdd(item) {
    console.log('handleObjAdd', item);
  }

  handleAddReservation(data) {
    console.log(data);
  }

  render () {
    console.log(this.state);
    return (
     <div className='root'>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a id='app-title' href="#">FunTrip</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <TripList loggedIn={this.state.loggedIn} trips={this.state.trips} />
            <DesinationList loggedIn={this.state.loggedIn} destinations={this.state.lastTrip.destinations} />

            <Nav pullRight>
              <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
              <Logout loggedIn={this.state.loggedIn} user={this.state.user} handleLogout={this.handleLogout} />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Grid fluid>
          <Row>
            <Col xs={6} md={6}>
              <PrepList preparationItems={this.state.lastTrip.preparationItems}/>
            </Col>
            <Col xs={6} md={6}>
              <ObjList objectives={this.state.lastTrip.objectives} handleObjAdd={this.handleObjAdd}/>
            </Col>            
          </Row>    
        </Grid>

        <div className="main col-md-12">
          <CurrentInfo/>
          <ReservationList reservations={this.state.lastTrip.reservations} handleAddReservation={this.handleAddReservation}/>
          <MapView />
        </div>

        <button type="button" className="btn btn-primary" onClick = {() => { this.setState({sideBarOn: !this.state.sideBarOn}); }}>
          <i className="glyphicon glyphicon-align-left"></i>
        Toggle Sidebar
        </button>
        {this.state.sideBarOn ? <SideBar trips={this.state.trips} userName={this.state.user}/> : null}
        

      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
