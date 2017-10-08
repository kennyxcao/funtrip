import React from 'react';
import scriptLoader from 'react-async-script-loader';
import GOOGLE_MAP_API_KEY from '../config/googlemaps.js';
var equal = require('deep-equal');

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
    var isDestinationsUpdated = !equal(nextProps.destinations, this.props.destinations);
    var idDestIdUpdated = (nextProps.destId !== this.props.destId);
    var isObjectivesUpdated = !equal(nextProps.objectives, this.props.objectives);
    return isDestinationsUpdated || idDestIdUpdated || (isObjectivesUpdated && this.props.destId);
  }
  
  componentDidUpdate() {
    if (this.props.isScriptLoaded && this.props.isScriptLoadSucceed) {
      this.initMap();
    } else {
      console.log('Google API script was not loaded yet');
    }
  }

  renderOverviewMap() {
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

  renderDestinationMap() {
    var currentDestination = this.props.destinations.filter(destination => destination._id === this.props.destId)[0];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: currentDestination.lat, lng: currentDestination.lng}
    });

    for (let i = 0; i < this.props.objectives.length; i++) {
      let objective = this.props.objectives[i];
      if (objective.lat && objective.lng) {
        let marker = new google.maps.Marker({
          position: {lat: objective.lat, lng: objective.lng},
          map: map,
          title: objective.name
        });
        let contentString = `<div id=${objective._id}>${objective.name}</div>`;
        let infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
    }
  }

  initMap() {
    if (!this.props.destId) {
      this.renderOverviewMap();
    } else {
      this.renderDestinationMap();
    }
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
        <div id="map" ref='map' style={mapStyle}></div>
      </div>
    );
  }
}

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${GOOGLE_MAP_API_KEY}`])(MapView);
