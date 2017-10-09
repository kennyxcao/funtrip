import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Glyphicon} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
const React = require('react');

class PrepModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      responsibleUser: '',
      dueDate: '',
      error: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.reset = this.reset.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  reset () {
    this.setState({
      name: '',
      responsibleUser: '',
      dueDate: ''
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

  handleUserChange (e) {
    this.setState({ responsibleUser: e.target.value });    
  }

  handleDateChange (value, formattedValue) {
    this.setState({
      dueDate: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  handleClickSubmit () {
    this.setState({ error: false });
    if (!this.state.name || !this.state.responsibleUser) {
      this.setState({ error: true });
    } else {    
      this.props.handlePrepAdd(this.state);
      this.close();
    }
  }

  render() {
    return (
      <div className='preparation-modal inline'>
        <h3>Preparation <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" /></Button></h3>

        <Modal show={this.state.showModal} onHide={this.close} className={this.state.error ? 'animated shake' : ''}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Preparation Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId='preparationDate'>
                <ControlLabel>Due Date</ControlLabel>
                <DatePicker value={this.state.dueDate} onChange={this.handleDateChange} />
              </FormGroup>

              <FormGroup controlId='preparationName'>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type='text'
                  value={this.state.name}
                  placeholder='Describe your preparation to-do item'
                  onChange={this.handleNameChange}
                />
              </FormGroup>
            
              <FormGroup controlId='preparationUsers'>
                <ControlLabel>Designated Person</ControlLabel>
                <FormControl
                  componentClass='select' 
                  placeholder='select' 
                  onChange={this.handleUserChange}
                  value={this.state.responsibleUser}
                >
                  <option value='' disabled hidden>Choose a group member</option>
                  {this.props.users.map((user, index) => <option value={user._id} key={index}>{user.username}</option>)}
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

export default PrepModal;