import {Button, Glyphicon, MenuItem} from 'react-bootstrap';
import React from 'react';

class TripItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hover: false
    };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter () {
    this.setState({hover: true});
  }

  mouseLeave () {
    this.setState({hover: false});
  }

  render() {
    return (
      <MenuItem eventKey={1 + +this.props.key * 0.1} className='trip-item' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {this.props.trip.name}
        {this.state.hover ? 
          <Button bsStyle="default" bsSize="xsmall" onClick={() => this.props.handleTripDelete(this.props.trip._id)}><Glyphicon glyph="remove"/></Button>
        : null}
      </MenuItem>
    );
  }
}

export default TripItem;