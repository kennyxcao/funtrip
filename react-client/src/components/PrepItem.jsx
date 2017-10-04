import React from 'react';

class PrepItem extends React.Component {
  constructor(props) {
    super(props);  
  }
  
  changeStatusHandler(e) {
    console.log('PrepItem was clicked', e.target.id, e.target.checked);
  }
  
  deleteItemHandler(e) {
    console.log('PrepItem should be deleted', e.target.id);
  }

  render() {
    return (
      <div>
        <input type="checkbox" id={this.props.item._id}
          checked={this.props.item.checked} 
          onChange={this.changeStatusHandler.bind(this)}/>
        {this.props.item.name}<button onClick={this.deleteItemHandler.bind(this)}> [X] </button>
      </div>
    );
  }
}

export default PrepItem;

