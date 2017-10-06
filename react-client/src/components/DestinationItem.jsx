import {Button, Glyphicon, NavItem} from 'react-bootstrap';
import React from 'react';

class DestinationItem extends React.Component {
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
      <NavItem className='destination-item' eventKey={3 + this.props.key} href="#" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <span onClick={() => this.props.handleDestinationSelect(this.props.destination._id)}>{this.props.destination.name}</span>
        {this.state.hover ? 
          <Button bsStyle="default" bsSize="xsmall" onClick={() => this.props.handleDestinationDelete(this.props.destination._id)}><Glyphicon glyph="remove"/></Button>
        : null}
      </NavItem>
    );
  }
}

export default DestinationItem;