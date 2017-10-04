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
      date: ''
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

  handleDestinationChange (e) {
    this.setState({ destination: e.target.value });    
  }

  handleDateChange (value, formattedValue) {
    this.setState({
      date: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
    });
  }

  handleClickSubmit () {
    this.props.handleObjAdd(this.state);
    this.close();
  }

  render() {
    return (
      <div className='objective-modal inline'>
        <h3>Objective List <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" /></Button></h3>

        <Modal show={this.state.showModal} onHide={this.close}>
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
            
              <FormGroup controlId='reservationCategory'>
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

// class ObjList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: [
//         { 
//           id: 1,
//           description: 'Visit local restaurants',
//           status: 'unchecked'
//         },
//         { 
//           id: 2,
//           description: 'Eiffel Tower',
//           status: 'unchecked'
//         },
//         { 
//           id: 3,
//           description: 'The Louvre',
//           status: 'unchecked'
//         }
//       ],
//       add: false,
//       name: '',
//       category: ''
//     };
//     this.handleOptions = this.handleOptions.bind(this);
//   }
//   handlePlusClick() {
//     var add = this.state.add;
//     this.setState({
//       add: !add
//     });
//   }
//   handleInput(e) {
//     var name = e.target.value;
//     this.setState({
//       name: name
//     });
//   }
//   handleOptions(e) {
//     var category = e.target.value; 
//     this.setState({
//       category: category
//     });
//   }
//   handleAddBtn() {
//     var name = this.state.name;
//     var category = this.state.category;
//     var newObjItem = {
//       name: name,
//       category: category
//     };
//     this.props.handleObjAdd(newObjItem);
//     this.setState({
//       add: false
//     });
//   }
//   render() {
//     return (
//       <div> 
//         <h3 className="componentTitle">Objectives <button onClick={this.handlePlusClick.bind(this)} type="button" className="btn btn-default btn-xs">+</button></h3> 
//         <div> 
//           There are {this.state.list.length} things I want to do
//         </div>
//         <div> 
//          {this.state.list.map((item, index) =>
//             <ObjItem item={item} key={index}/>
//           )}
//         </div>
//         { 
//           (this.state.add) ? 
//           (<div>I want to: <input type="text" onChange={this.handleInput.bind(this)}/>
//             <select 
//              defaultValue={this.state.category} 
//              onChange={this.handleOptions}>
//               <option>Choose a category</option>
//               <option value="Sightseeing">Sightseeing</option>
//               <option value="Food to try">Food to try</option>
//               <option value="Activities">Activities</option>
//             </select>    
//           <button type="button" className="btn btn-default btn-xs" onClick={this.handleAddBtn.bind(this)}>add!</button> </div>) : ''
//         }
//       </div>
//     );
//   }
// }