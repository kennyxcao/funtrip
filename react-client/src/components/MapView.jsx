import React from 'react';

var loadScript = function(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading

  head.appendChild(script);
};

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('this.props:', this.props);
    //loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyByH0c5bxYDZ48BLQ401BBsm4DppG6QNkQ', this.initMap.bind(this));
  }

  changeModeHandler(e) {
    this.setState({mode: e.target.value});
  }

  shouldComponentUpdate() {
    return true;
  }
  
  componentDidUpdate() {
    console.log('MAP componentDidUpdate');
    loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyByH0c5bxYDZ48BLQ401BBsm4DppG6QNkQ', this.initMap.bind(this));
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
    console.log('MAP RENDERING', this.props.destinations);
    var mapStyle = {
      width: 500,
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

export default MapView;
