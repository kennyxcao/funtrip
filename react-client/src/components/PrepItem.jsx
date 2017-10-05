import {Checkbox, Button, Glyphicon} from 'react-bootstrap';
import React from 'react';

class PrepItem extends React.Component {
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
      <div className='prep-item' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <Checkbox checked={this.props.preparation.checked} onChange={() => this.props.handlePrepItemChange(this.props.preparation._id, !this.props.preparation.checked)}>
          {this.props.preparation.name}
          {this.state.hover ? 
            <Button bsStyle="default" bsSize="xsmall" onClick={() => this.props.handlePrepItemDelete(this.props.preparation._id)}><Glyphicon glyph="remove"/></Button>
            : null}
        </Checkbox>
      </div>
    );
  }
}

export default PrepItem;

