import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon, MenuItem} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
const React = require('react');

class TripJoinModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      tripId: ''
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.handleTripIdChange = this.handleTripIdChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  reset () {
    this.setState({
      tripId: ''
    });
  }

  close() {
    this.setState({ showModal: false });
    this.reset();    
  }

  open() {
    this.setState({ showModal: true });
  }

  handleTripIdChange (e) {
    this.setState({ tripId: e.target.value });    
  }

  handleClickSubmit () {
    this.props.handleTripJoin(this.state.tripId);
    this.close();
  }

  render() {
    return (
      <MenuItem className='trip-join-modal'>
        <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" />Join a existing trip</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Join a existing trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId='tripId'>
                <ControlLabel>Trip Id</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.tripId}
                  placeholder='Enter an existing tripId'
                  onChange={this.handleTripIdChange}
                />
              </FormGroup>        
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button type='submit' onClick={this.handleClickSubmit}>Submit</Button>            
          </Modal.Footer>
        </Modal>
      </MenuItem>
    );
  }
}

export default TripJoinModal;