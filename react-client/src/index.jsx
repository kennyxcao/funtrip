import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, PageHeader, Navbar, Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import $ from 'jquery';
import _ from 'lodash';
import {ajaxGet, ajaxPost, ajaxDelete, ajaxPatch} from './services/ajaxHelpers.js';
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
import GOOGLE_MAP_API_KEY from './config/googlemaps.js';
const Promise = require('bluebird');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      trips: [],
      lastTrip: {destinations: [], reservations: [], preparationItems: [], objectives: [], trip: {}},
      loggedIn: false,
      sideBarOn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);    
    this.handleObjAdd = this.handleObjAdd.bind(this);
    this.handleObjItemChange = this.handleObjItemChange.bind(this);
    this.handleObjItemDelete = this.handleObjItemDelete.bind(this);
    this.handleReservationAdd = this.handleReservationAdd.bind(this);
    this.handlePrepAdd = this.handlePrepAdd.bind(this);
    this.handlePrepItemChange = this.handlePrepItemChange.bind(this);
    this.handlePrepItemDelete = this.handlePrepItemDelete.bind(this);
    this.handleReservationDelete = this.handleReservationDelete.bind(this);
    this.handleTripAdd = this.handleTripAdd.bind(this);
    this.handleTripDelete = this.handleTripDelete.bind(this); 
    this.handleTripJoin = this.handleTripJoin.bind(this);
    this.handleDestinationAdd = this.handleDestinationAdd.bind(this);
    this.handleDestinationDelete = this.handleDestinationDelete.bind(this);
  }

  componentDidMount() {
    this.handleLogin();
  }

  fetchUserTrips() {
    let data = {userName: this.state.user};
    ajaxPost('/trips', JSON.stringify(data), 'application/json', 'json', (results) => {
      this.setState({
        trips: results.trips, 
        lastTrip: results.lastTrip
      });
    });
  }

  handleLogin(loginInfo) {
    let data = loginInfo ? JSON.stringify(loginInfo) : JSON.stringify({username: null});
    ajaxPost('/login', data, 'application/json', 'json', (results) => {
      if (results.username) {
        console.log('Sucessiful Login');
        this.setState({
          loggedIn: true, 
          user: results.username
        });  
        this.fetchUserTrips();        
      } else {
        console.error('Incorrect Login');          
      }
    });
  }

  handleLogout (e) {
    ajaxPost('/logout', '', null, 'text', (results) => {
      this.setState({
        loggedIn: false,
        user: ''
      });
    });
  }  

  handleObjAdd({name, category, date, destination}) {
    let trip = this.state.lastTrip.trip._id;
    let data = {name, category, date, destination, trip};
    ajaxPost('/obj', JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    }); 
  }

  handleObjItemChange (objId, newChecked) {
    let data = {checked: newChecked};
    ajaxPatch('/obj/' + objId, JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }

  handleObjItemDelete (objId) {
    ajaxDelete('/obj/' + objId, JSON.stringify({}), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }

  handleReservationAdd({name, category, referenceNumber, date, destination}) {
    console.log(name, category, referenceNumber, date, destination);
  }

  handleReservationDelete (resId) {
    console.log(resId);
  }

  handlePrepAdd ({name, dueDate, responsibleUser}) {
    $.ajax({
      method: 'POST',
      url: '/addPrepItem', 
      data: JSON.stringify({name: name, dueDate: dueDate, responsibleUser: this.state.trips[0]._id, tripId: this.state.trips[0]._id}),
      contentType: 'application/json',
      success: (results) => {
        console.log('successfully Added prep item');
        this.fetchUserTrips();
      },
      error: (error) => {
        console.error('Add trip error');
        console.error(error);        
      }
    }); 
  }

  handlePrepItemChange (prepId, checked) {
    $.ajax({
      method: 'POST',
      url: '/checkedPrepItem', 
      data: JSON.stringify({_id: prepId, checked: checked}),
      contentType: 'application/json',
      success: (results) => {
        console.log('successfully checked prep item');
        this.fetchUserTrips();
      },
      error: (error) => {
        console.error('Trips Error');
        console.error(error);        
      }
    }); 
  }

  handlePrepItemDelete (prepId) {
    $.ajax({
      method: 'POST',
      url: '/deletePrep', 
      data: JSON.stringify({_id: prepId}),
      contentType: 'application/json',
      success: (results) => {
        console.log('successfully deleted prep item');
        this.fetchUserTrips();
      },
      error: (error) => {
        console.error('Trips Error');
        console.error(error);        
      }
    }); 
  }

  handleTripAdd ({name}) {
    console.log(name);
  }

  handleTripDelete (tripId) {
    console.log(tripId);
  }

  handleTripJoin (tripId) {
    console.log(tripId);
  }

  handleDestinationAdd ({name, startDate, endDate}) {
    // Need to get fetch lat and lng value using google map API
    console.log(name, startDate, endDate);
  }

  getLocationForDestination(name) {
    return new Promise(function(resolve, reject) {
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${GOOGLE_MAP_API_KEY}`;
      $.ajax({
        url: url,
        success: (data) => {
          var location = {lat: 0, lng: 0};
          if ((data.status === 'OK') && (data.results.length > 0)) {
            location = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};
          }
          resolve(location);
        },
        error: (error) => {
          console.error('getLocationForDestination error: ', error.message);
          reject(error);
        }
      });
    });
  }

  handleDestinationDelete (destinationId) {
    console.log(destinationId);
  }  

  render () {
    return (
      <div className='react-root'>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a id='app-title' href="#">FunTrip</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <DesinationList 
              loggedIn={this.state.loggedIn} 
              destinations={this.state.lastTrip.destinations}
              handleDestinationAdd={this.handleDestinationAdd}
              handleDestinationDelete={this.handleDestinationDelete}
            />
            <TripList 
              loggedIn={this.state.loggedIn} 
              trips={this.state.trips}
              handleTripAdd={this.handleTripAdd}
              handleTripDelete={this.handleTripDelete}
              handleTripJoin={this.handleTripJoin}
            />
            <Nav pullRight>
              <Login 
                loggedIn={this.state.loggedIn} 
                handleLogin={this.handleLogin}
              />
              <Logout 
                loggedIn={this.state.loggedIn} 
                user={this.state.user} 
                handleLogout={this.handleLogout}
              />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Grid fluid>
          <Row>
            <Col sm={6} md={5} mdOffset={1}>
              <PrepList 
                preparationItems={this.state.lastTrip.preparationItems}
                users={this.state.lastTrip.trip.users ? this.state.lastTrip.trip.users : []} // users object not yet implemented in fetching trip state - only userId avaiable
                handlePrepAdd={this.handlePrepAdd} 
                handlePrepItemChange={this.handlePrepItemChange} 
                handlePrepItemDelete={this.handlePrepItemDelete}
              />
            </Col>
            <Col sm={6} md={5}>
              <ObjList 
                objectives={this.state.lastTrip.objectives}
                destinations={this.state.lastTrip.destinations}
                handleObjAdd={this.handleObjAdd}
                handleObjItemChange={this.handleObjItemChange}
                handleObjItemDelete={this.handleObjItemDelete}
              />
            </Col>            
          </Row>
          <Row>
            <Col sm={6} md={5} mdOffset={1}>
              <CurrentInfo
                trip={this.state.lastTrip.trip}
              />
            </Col>
            <Col sm={6} md={5}>
              <ReservationList 
                reservations={this.state.lastTrip.reservations}
                destinations={this.state.lastTrip.destinations}
                handleReservationAdd={this.handleReservationAdd}
                handleReservationDelete={this.handleReservationDelete}
              />
            </Col>            
          </Row>
          <Row>
            <Col sm={10} md={10} mdOffset={1}>
              <MapView 
                destinations={this.state.lastTrip.destinations}
              />
            </Col>          
          </Row>             
        </Grid>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

// Side Bar
// var sidebarTestData = [{location: 'Paris'}, {location: 'San Francisco'}, {location: 'Alaska'}];
// <Nav pullRight>
//   <button type="button" className="btn btn-primary" onClick = {() => { this.setState({sideBarOn: !this.state.sideBarOn}); }}>
//     <i className="glyphicon glyphicon-align-left"></i>
//   My Trips
//   </button>
//   {this.state.sideBarOn ? <SideBar trips={this.state.trips} userName={this.state.user}/> : null}
// </Nav>