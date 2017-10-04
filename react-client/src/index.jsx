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
      lastTrip: {destinations: [], reservations: [], preparationItems: [], objectives: [], trip: {}},
      loggedIn: false,
      sideBarOn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);    
    this.handleObjAdd = this.handleObjAdd.bind(this);
    this.handleReservationAdd = this.handleReservationAdd.bind(this);
    this.handlePrepAdd = this.handlePrepAdd.bind(this);
    this.handlePrepItemChange = this.handlePrepItemChange.bind(this);
    this.handlePrepItemDelete = this.handlePrepItemDelete.bind(this);
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

  handleReservationAdd({name, category, referenceNumber, date}) {
    console.log(name, category, referenceNumber, date);
  }

  handlePrepAdd ({name, dueDate, responsibleUser}) {
    console.log(name, responsibleUser, dueDate);
  }

  handlePrepItemChange (prepId) {
    console.log(prepId);
  }

  handlePrepItemDelete (prepId) {
    console.log(prepId);
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
            />
            <TripList 
              loggedIn={this.state.loggedIn} 
              trips={this.state.trips} 
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
                handleObjAdd={this.handleObjAdd}
              />
            </Col>            
          </Row>
          <Row>
            <Col sm={6} md={5} mdOffset={1}>
              <CurrentInfo/>
            </Col>
            <Col sm={6} md={5}>
              <ReservationList 
                reservations={this.state.lastTrip.reservations} 
                handleReservationAdd={this.handleReservationAdd}
              />
            </Col>            
          </Row>
          <Row>
            <Col sm={10} md={10} mdOffset={1}>
              <MapView />
            </Col>          
          </Row>             
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// Side Bar
// <Nav pullRight>
//   <button type="button" className="btn btn-primary" onClick = {() => { this.setState({sideBarOn: !this.state.sideBarOn}); }}>
//     <i className="glyphicon glyphicon-align-left"></i>
//   My Trips
//   </button>
//   {this.state.sideBarOn ? <SideBar trips={this.state.trips} userName={this.state.user}/> : null}
// </Nav>