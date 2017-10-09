import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
const React = require('react');

class ObjModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      category: '',
      destination: '',
      date: '',
      error: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  reset () {
    this.setState({
      name: '',
      category: '',
      destination: '',
      date: ''
    });
  }

  close() {
    this.setState({ showModal: false, error: false });
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

  handleDestinationChange (e) {
    this.setState({ destination: e.target.value });    
  }

  handleDateChange (value, formattedValue) {
    this.setState({
      date: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  handleClickSubmit () {
    this.setState({ error: false });
    if (!this.state.name || !this.state.category || !this.state.destination || !this.state.date) {
      this.setState({ error: true });
    } else {
      this.props.handleObjAdd(this.state);
      this.close();
    }
  }

  render() {
    return (
      <div className='objective-modal inline'>
        <h3>Objective List <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" /></Button></h3>

        <Modal show={this.state.showModal} onHide={this.close} className={this.state.error ? 'animated shake' : ''}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Objective</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId='objectiveDate'>
                <ControlLabel>Date</ControlLabel>
                <DatePicker value={this.state.date} onChange={this.handleDateChange} />
              </FormGroup>

              <FormGroup controlId='objectiveName'>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.name}
                  placeholder='Describe your objective to-do item'
                  onChange={this.handleNameChange}
                />
              </FormGroup>
            
              <FormGroup controlId='objectiveCategory'>
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  componentClass='select' 
                  placeholder='select' 
                  onChange={this.handleCategoryChange}
                  value={this.state.category}
                >
                  <option value='' disabled hidden>Choose here</option>
                  <option value='sightseeing'>Sightseeing</option>
                  <option value='food'>Food</option>
                  <option value='activities'>Activities</option>
                </FormControl>
              </FormGroup>    

              <FormGroup controlId='objectiveDestination'>
                <ControlLabel>Destination</ControlLabel>
                <FormControl
                  componentClass='select' 
                  placeholder='select' 
                  onChange={this.handleDestinationChange}
                  value={this.state.destination}
                >
                  <option value='' disabled hidden>Choose a trip destination</option>
                  {this.props.destinations.map((destination, index) => <option value={destination._id} key={index}>{destination.name}</option>)}
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

export default ObjModal;