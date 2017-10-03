import React from 'react';
import PrepItem from './PrepItem.jsx';
class PrepList extends React.Component {
  constructor(props) {
    super(props);
  }
  addItemHandler() {
    console.log('Add button was clicked');
  }
  render() {
    return (
      <div> 
        <h3 className="componentTitle">Preparation List <button onClick={this.addItemHandler.bind(this)}>[+]</button></h3>
        <div> 
          There are {this.props.preparationItems.length} items to bring
        </div>
        <div> 
          {this.props.preparationItems.map((item, index) =>
            <PrepItem item={item} key={index}/>
          )}
        </div>
      </div>
    );
  }
}

export default PrepList;