import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
    
  }

  render() {
    return (
      <div>
        <input type="checkbox"/> {this.props.item.description}
      </div>
    );
  }
}


export default Todo;