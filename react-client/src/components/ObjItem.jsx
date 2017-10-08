import {Checkbox, Button, Glyphicon} from 'react-bootstrap';
import Moment from 'react-moment';
import React from 'react';

class ObjItem extends React.Component {
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
      <div className='objective-item' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <Checkbox checked={this.props.objective.checked} onChange={() => this.props.handleObjItemChange(this.props.objective._id, !this.props.objective.checked)}>
          {this.props.objective.name} on <Moment format='MM/DD' date={this.props.objective.date}/>
          {this.state.hover ? 
            <Button bsStyle="default" bsSize="xsmall" onClick={() => this.props.handleObjItemDelete(this.props.objective._id)}><Glyphicon glyph="remove"/></Button>
            : null}
        </Checkbox>
      </div>
    );
  }
}

export default ObjItem;
