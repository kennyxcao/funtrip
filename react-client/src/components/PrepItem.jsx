import {Checkbox, Button, Glyphicon} from 'react-bootstrap';
import Moment from 'react-moment';
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
          {this.props.preparation.name} <span className='italic'>due on <Moment format='MM/DD' date={this.props.preparation.dueDate}/>{`, assigned to ${this.props.users.filter(user => user._id === this.props.preparation.responsibleUser)[0].username}`}</span>
          {this.state.hover ? 
            <Button bsStyle="default" bsSize="xsmall" onClick={() => this.props.handlePrepItemDelete(this.props.preparation._id)}><Glyphicon glyph="remove"/></Button>
            : null}
        </Checkbox>
      </div>
    );
  }
}

export default PrepItem;

