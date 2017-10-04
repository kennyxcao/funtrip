import React from 'react';

class ObjItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    // this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(props) {
    console.log('hi', props);
  }
  handleStatus(props) {
    console.log('hi', props);
  }
  render() {
    return (
      <div>
        <input onClick={this.handleStatus.bind(this, this.props.item)}type="checkbox"/>{this.props.item.description}  
        <button onClick={this.handleDelete.bind(this, this.props.item)} type="button" className="btn btn-default btn-xs">-</button>
      </div>
    );
  }
}


export default ObjItem;
