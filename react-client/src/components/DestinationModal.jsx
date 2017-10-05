import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon, NavItem} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
const React = require('react');

class DestinationModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      startDate: '',
      endDate: '',
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
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

  handleNameChange (e) {
    this.setState({ name: e.target.value });    
  }

  handleStartDateChange(value, formattedValue) {
    this.setState({
      startDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  handleEndDateChange (value, formattedValue) {
    this.setState({
      endDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }  

  handleClickSubmit () {
    this.props.handleDestinationAdd(this.state);
    this.close();
  }

  render() {
    return (
      <NavItem className='destination-modal'>
        <Button bsStyle="default" bsSize="xsmall" onClick={this.open}><Glyphicon glyph="plus" /></Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Destination</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId='destinationStart'>
                <ControlLabel>Start Date</ControlLabel>
                <DatePicker value={this.state.startDate} onChange={this.handleStartDateChange} />
              </FormGroup>

              <FormGroup controlId='destinationEnd'>
                <ControlLabel>End Date</ControlLabel>
                <DatePicker value={this.state.endDate} onChange={this.handleEndDateChange} />
              </FormGroup>

              <FormGroup controlId='destinationName'>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.name}
                  placeholder='Enter a new destination name'
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
      </NavItem>
    );
  }
}

export default DestinationModal;