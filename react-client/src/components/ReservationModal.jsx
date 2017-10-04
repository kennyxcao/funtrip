import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
const React = require('react');

class ReservationModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      category: '',
      referenceNumber: '',
      date: ''
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleReferenceChange = this.handleReferenceChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  reset () {
    this.setState({
      name: '',
      category: '',
      referenceNumber: '',
      date: '',
      formattedDate: ''      
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

  handleCategoryChange (e) {
    this.setState({ category: e.target.value });    
  }

  handleReferenceChange (e) {
    this.setState({ referenceNumber: e.target.value });        
  }

  handleDateChange (value, formattedValue) {
    this.setState({
      date: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  handleClickSubmit () {
    this.props.handleAddReservation(this.state);
    this.close();
  }

  render() {
    return (
      <div className='reservation-modal inline'>
        <h3>Reservations <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" /></Button></h3>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId='reservationDate'>
                <ControlLabel>Date</ControlLabel>
                <DatePicker value={this.state.date} onChange={this.handleDateChange} />
              </FormGroup>

              <FormGroup controlId='reservationName'>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.name}
                  placeholder='Describe your reservation'
                  onChange={this.handleNameChange}
                />
              </FormGroup>

              <FormGroup controlId='reservationReference'>
                <ControlLabel>Reference #</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.referenceNumber}
                  placeholder='Reference number/code'
                  onChange={this.handleReferenceChange}
                />
              </FormGroup>              

              <FormGroup controlId='reservationCategory'>
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass='select' 
                  placeholder='select' 
                  onChange={this.handleCategoryChange}
                  value={this.state.category}
                >
                  <option value='' disabled hidden>Choose here</option>
                  <option value='hotel'>Hotel</option>
                  <option value='flight'>Flight</option>
                  <option value='ticket'>Ticket</option>
                  <option value='train'>Train</option>
                  <option value='rental'>Rental</option>
                </FormControl>
              </FormGroup>          
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button type='submit' onClick={this.handleClickSubmit}>Submit</Button>            
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ReservationModal;