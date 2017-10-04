import {Button, Glyphicon} from 'react-bootstrap';
import Moment from 'react-moment';
const React = require('react');

class ReservationItem extends React.Component {
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
        <tr className='reservation-item' onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
          <td><Moment format='YYYY/MM/DD' date={this.props.reservation.date}/></td>
          <td>{this.props.reservation.category}</td>
          <td>{this.props.reservation.name}</td>
          <td>{this.props.reservation.referenceNumber}</td>
          <td>{this.state.hover ? 
            <Button bsStyle="default" bsSize="xsmall" onClick={() => this.props.handleReservationDelete(this.props.reservation._id)}><Glyphicon glyph="remove"/></Button>
            : null}
          </td>
        </tr>
    );
  }
}

export default ReservationItem;