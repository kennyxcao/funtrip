import React from 'react';

class MapView extends React.Component {
  constructor() {
    super();
    this.state = {
      position: {
        lat: 48.8566,
        lng: 2.3522
      }
    };
    
  }
  componentDidMount() {   
    let self = this;
    loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyByH0c5bxYDZ48BLQ401BBsm4DppG6QNkQ', function() {
      self.map = new google.maps.Map(self.refs.map, { 
        center: {
          lat: self.state.position.lat, 
          lng: self.state.position.lng
        },  
        zoom: 8 
      });
      self.marker = new google.maps.Marker({
        position: {
          lat: self.state.position.lat, 
          lng: self.state.position.lng
        },
        map: self.map
      });
    });
  }
  // panToArcDeTriomphe() {
  //   console.log(this);
  //   this.map.panTo({ lat:48.873947, lng:2.295038});
  // }
  render() {
    var style = {
      width: 500,
      height: 500,
      border: '1px solid black'
    };
    return (
      <div>
        <h4>This is the trip map</h4> 
        <div ref="map" style={style}> MapView
          

        </div>
      </div>
    );
  }
}


 // ReactDOM.render(<Map />, document.getElementById('root'));

function loadScript(url, callback) {
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
}
//window.GoogleMAp = 'AIzaSyDP63qMh5ZntIla86O8M-6iSsNAafNtwVE';

export default MapView;


// class MapView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       position: {
//         lat: 48.8566,
//         lng: 2.3522
//       }
//     };
    
//   }

//   componentDidMount() {
//     new google.maps.Map(this.refs.map, {
//       center: {
//         lat: this.state.position.lat, 
//         lng: this.state.position.lng
//       },
//       zoom: 8
//     });
//   }
//   render() {
//     var style = {
//       width: 500,
//       height: 500,
//       border: '1px solid black'
//     };
//     return (
//       <div>
//         <h4>This is the trip map</h4> 
//         <div ref="map" style={style}> MapView
          

//         </div>
//       </div>
//     );
//   }
// }