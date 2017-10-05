import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon, MenuItem} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
const React = require('react');

class TripAddModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      name: ''
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  reset () {
    this.setState({
      name: ''
    });
  }

  close() {
    this.setState({ showModal: false });
    this.reset();    
  }

  open() {
    this.setState({ showModal: true });
  }

  handleNameChange (e) {
    this.setState({ name: e.target.value });    
  }

  handleClickSubmit () {
    this.props.handleTripAdd(this.state);
    this.close();
  }

  render() {
    return (
      <MenuItem className='trip-add-modal'>
        <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" />Add a new trip</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId='tripName'>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.name}
                  placeholder='Describe your new trip name'
                  onChange={this.handleNameChange}
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

export default TripAddModal;