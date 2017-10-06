import React from 'react';
import scriptLoader from 'react-async-script-loader';
import GOOGLE_MAP_API_KEY from '../config/googlemaps.js';
var equal = require('deep-equal');

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
  //   if (isScriptLoaded && !this.props.isScriptLoaded) {
  //     if (isScriptLoadSucceed) {
  //       this.initMap();
  //     } else {
  //       console.log('componentWillReceiveProps error: ', error.message);
  //     }
  //   }
  // }

  componentDidMount() {
    if (this.props.isScriptLoaded && this.props.isScriptLoadSucceed) {
      this.initMap();
    } else {
      console.log('Google API script was not loaded yet');
    }
  }

  changeModeHandler(e) {
    this.setState({mode: e.target.value});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !equal(nextProps.destinations, this.props.destinations);
  }
  
  componentDidUpdate() {
    if (this.props.isScriptLoaded && this.props.isScriptLoadSucceed) {
      this.initMap();
    } else {
      console.log('Google API script was not loaded yet');
    }
  }

  initMap() {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var waypoints = [];
    directionsDisplay = new google.maps.DirectionsRenderer();
    var destinations = this.props.destinations;
    var len = destinations.length;
    if (len > 0) {
      var start = new google.maps.LatLng(destinations[0].lat, destinations[0].lng);
      var end = new google.maps.LatLng(destinations[len - 1].lat, destinations[len - 1].lng);
      for (var i = 1; i < len - 1; i++) {
        var location = new google.maps.LatLng(destinations[i].lat, destinations[i].lng);
        waypoints.push({location: location, stopover: true});
      }
    } else {
      var start = new google.maps.LatLng(0, 0);
      var end = new google.maps.LatLng(0, 0);
    }
    var mapOptions = {
      zoom: 7,
      center: start
    };
    map = new google.maps.Map(this.refs.map, mapOptions);
    directionsDisplay.setMap(map);
    var request = {
      origin: start,
      destination: end,
      waypoints: waypoints,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    });
  }

  render() {
    var mapStyle = {
      width: '100%',
      height: 500,
      border: '1px solid black'
    };

    return (
      <div>
        <h4>Trip Map</h4>
        {/*        <div id="floating-panel">
          <b>Mode of Travel: </b>
          <select id="mode" ref='mode'>
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
        </div>*/}
        <div id="map" ref='map' style={mapStyle}></div>
      </div>
    );
  }
}

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAP_API_KEY}`])(MapView);
