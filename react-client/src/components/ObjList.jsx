import React from 'react';
import ObjItem from './ObjItem.jsx';
class ObjList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { 
          id: 1,
          description: 'Visit local restaurants',
          status: 'unchecked'
        },
        { 
          id: 2,
          description: 'Eiffel Tower',
          status: 'unchecked'
        },
        { 
          id: 3,
          description: 'The Louvre',
          status: 'unchecked'
        }
      ],
      add: false,
      name: '',
      category: ''
    };
    this.handleOptions = this.handleOptions.bind(this);
  }
  handlePlusClick() {
    var add = this.state.add;
    this.setState({
      add: !add
    });
  }
  handleInput(e) {
    var name = e.target.value;
    this.setState({
      name: name
    });
  }
  handleOptions(e) {
    var category = e.target.value; 
    this.setState({
      category: category
    });
  }
  handleAddBtn() {
    var name = this.state.name;
    var category = this.state.category;
    var newObjItem = {
      name: name,
      category: category
    };
    this.props.handleObjAdd(newObjItem);
    this.setState({
      add: false
    });
  }
  render() {
    return (
      <div> 
        <h3 className="componentTitle">Objectives <button onClick={this.handlePlusClick.bind(this)} type="button" className="btn btn-default btn-xs">+</button></h3> 
        <div> 
          There are {this.state.list.length} things I want to do
        </div>
        <div> 
         {this.state.list.map((item, index) =>
            <ObjItem item={item} key={index}/>
          )}
        </div>
        { 
          (this.state.add) ? 
          (<div>I want to: <input type="text" onChange={this.handleInput.bind(this)}/>
            <select 
             defaultValue={this.state.category} 
             onChange={this.handleOptions}>
              <option>Choose a category</option>
              <option value="Sightseeing">Sightseeing</option>
              <option value="Food to try">Food to try</option>
              <option value="Activities">Activities</option>
            </select>    
          <button type="button" className="btn btn-default btn-xs" onClick={this.handleAddBtn.bind(this)}>add!</button> </div>) : ''
        }
      </div>
    );
  }
}
// {
// <select value={this.state.category} onChange={this.handleOptions.bind(this)}> 
            
//             <option value="Sightseeing">Sightseeing</option>
//             <option value="Food to try">Food to try</option>
//             <option value="Activities">Activities</option>
//           </select>
// }
export default ObjList;
