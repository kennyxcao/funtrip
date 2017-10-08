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
      loggedIn: false,
      user: '',
      userId: '',
      trips: [],
      lastTrip: {destinations: [], reservations: [], preparationItems: [], objectives: [], trip: {}},
      reservations: [],
      preparationItems: [],
      objectives: [],
      destId: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this); 
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
    this.handleTripSelect = this.handleTripSelect.bind(this);
    this.handleDestinationAdd = this.handleDestinationAdd.bind(this);
    this.handleDestinationDelete = this.handleDestinationDelete.bind(this);
    this.handleDestinationSelect = this.handleDestinationSelect.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    this.handleLogin();
  }

  renderComponentsByDestination (destId) {
    if (!destId) {
      this.setState({
        preparationItems: this.state.lastTrip.preparationItems,
        reservations: this.state.lastTrip.reservations,
        objectives: this.state.lastTrip.objectives        
      });
    } else {
      this.setState({
        preparationItems: this.state.lastTrip.preparationItems,
        reservations: this.state.lastTrip.reservations.filter(reservation => reservation.destination === destId),
        objectives: this.state.lastTrip.objectives.filter(objective => objective.destination === destId)           
      });
    }
  }

  fetchTrip (tripId) {
    // fetch trip information based on user selection
    ajaxGet('/trip', {tripId}, 'application/json', 'json', (results) => {
      console.log('Fetched New Trip', results);
      this.setState({
        lastTrip: results.trip
      });
      if (this.state.destId) {        
        this.renderComponentsByDestination(this.state.destId);
      } else {
        this.renderComponentsByDestination();
      }
    });    
  }

  fetchUserTrips() {
    let data = {username: this.state.user};
    ajaxGet('/trips', data, 'application/json', 'json', (results) => {
      console.log('Fetched User Trips', results);
      this.setState({
        trips: results.trips, 
      });
      if (!this.state.lastTrip.trip._id) {
        this.fetchTrip(results.trips[results.trips.length - 1]._id);
      } else {
        this.fetchTrip(this.state.lastTrip.trip._id);        
      }
    });
  }

  handleSignup ({username, pw}) {
    if (!username || !pw) {
      return console.error('Username or password cannot be empty');
    }
    ajaxPost('/signup', JSON.stringify({username, pw}), 'application/json', 'json', (results) => {
      if (results.username) {
        console.log('Sucessiful Signup');
        this.setState({
          loggedIn: true, 
          user: results.username,
          userId: results.userId
        });  
        this.fetchUserTrips(); 
      } else {
        console.error('Username already exists');          
      }
    });
  }

  handleLogin(loginInfo) {
    let data = loginInfo ? JSON.stringify(loginInfo) : JSON.stringify({username: null});
    ajaxPost('/login', data, 'application/json', 'json', (results) => {
      if (results.username) {
        console.log('Sucessiful Login');
        this.setState({
          loggedIn: true, 
          user: results.username,
          userId: results.userId
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
        user: '',
        userId: '',
        trips: [],
        lastTrip: {destinations: [], reservations: [], preparationItems: [], objectives: [], trip: {}},
        reservations: [],
        preparationItems: [],
        objectives: [],
        destId: ''        
      });
    });
  }  

  handleObjAdd({name, category, date, destination}) {
    // let trip = this.state.lastTrip.trip._id;
    // let data = {name, category, date, destination, trip};
    // ajaxPost('/obj', JSON.stringify(data), 'application/json', 'text', (results) => {
    //   this.fetchUserTrips();
    // });
    this.fetchGeoCoordinates(name, ({lat, lng}) => {
      console.log('lat, lng:', lat, lng);
      let trip = this.state.lastTrip.trip._id;
      let data = {name, category, date, destination, trip, lat, lng};
      ajaxPost('/obj', JSON.stringify(data), 'application/json', 'text', (results) => {
        this.fetchUserTrips();
      });
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
    let trip = this.state.lastTrip.trip._id;
    let data = {name, category, referenceNumber, date, destination, trip};
    ajaxPost('/res', JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });    
  }

  handleReservationDelete (resId) {
    ajaxDelete('/res/' + resId, JSON.stringify({}), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });  
  }

  handlePrepAdd ({name, dueDate, responsibleUser}) {
    let trip = this.state.lastTrip.trip._id;
    let data = {name, dueDate, responsibleUser, trip};
    ajaxPost('/prep', JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }

  handlePrepItemChange (prepId, newChecked) {
    let data = {checked: newChecked};
    ajaxPatch('/prep/' + prepId, JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }

  handlePrepItemDelete (prepId) {
    ajaxDelete('/prep/' + prepId, JSON.stringify({}), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }

  handleTripAdd ({name}) {
    let users = [this.state.userId];
    let data = {name, users};
    ajaxPost('/trip', JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }

  handleTripDelete (tripId) {
    ajaxDelete('/trip/' + tripId, JSON.stringify({userId: this.state.userId}), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });  
  }

  handleTripJoin (tripId) {
    let userId = this.state.userId;
    let data = {tripId, userId};
    ajaxPost('/jointrip', JSON.stringify(data), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });    
  }

  handleTripSelect (tripId) {
    this.fetchTrip(tripId);
  }

  handleDestinationSelect (destId) {
    this.setState({
      destId: destId
    });
    this.renderComponentsByDestination(destId);
  }

  handleDestinationAdd ({name, startDate, endDate}) {
    // Need to get fetch lat and lng value using google map API
    this.fetchGeoCoordinates(name, ({lat, lng}) => {
      let trip = this.state.lastTrip.trip._id;
      let data = {name, startDate, endDate, lat, lng, trip};
      ajaxPost('/dest', JSON.stringify(data), 'application/json', 'text', (results) => {
        this.fetchUserTrips();
      });      
    });
  }

  handleDestinationDelete (destId) {
    ajaxDelete('/dest/' + destId, JSON.stringify({}), 'application/json', 'text', (results) => {
      this.fetchUserTrips();
    });
  }  

  fetchGeoCoordinates (name, callback) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${GOOGLE_MAP_API_KEY}`;
    ajaxGet(url, '', null, 'json', (data) => {
      let location = {lat: 0, lng: 0};
      if ((data.status === 'OK') && (data.results.length > 0)) {
        location = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};
      }
      callback(location);
    });    
  }
  handleCategorySelect (category) {
    if (category !== 'all') {
      this.setState({
        objectives: this.state.lastTrip.objectives.filter(objective => objective.category === category)           
      });
    } else {
      this.setState({
        objectives: this.state.lastTrip.objectives         
      });
    }
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
              handleDestinationSelect={this.handleDestinationSelect}
            />
            <TripList 
              loggedIn={this.state.loggedIn} 
              trips={this.state.trips}
              handleTripAdd={this.handleTripAdd}
              handleTripDelete={this.handleTripDelete}
              handleTripJoin={this.handleTripJoin}
              handleTripSelect={this.handleTripSelect}
            />
            <Nav pullRight>
              <Login 
                loggedIn={this.state.loggedIn} 
                handleLogin={this.handleLogin}
                handleSignup={this.handleSignup}
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
                preparationItems={this.state.preparationItems}
                users={this.state.lastTrip.trip.users ? this.state.lastTrip.trip.users : []} // users object not yet implemented in fetching trip state - only userId avaiable
                handlePrepAdd={this.handlePrepAdd} 
                handlePrepItemChange={this.handlePrepItemChange} 
                handlePrepItemDelete={this.handlePrepItemDelete}
              />
            </Col>
            <Col sm={6} md={5}>
              <ObjList 
                objectives={this.state.objectives}
                destinations={this.state.lastTrip.destinations}
                handleObjAdd={this.handleObjAdd}
                handleObjItemChange={this.handleObjItemChange}
                handleObjItemDelete={this.handleObjItemDelete}
                handleCategorySelect={this.handleCategorySelect}
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
                reservations={this.state.reservations}
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
                destId={this.state.destId}
                objectives={this.state.objectives}
              />
            </Col>          
          </Row>             
        </Grid>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
