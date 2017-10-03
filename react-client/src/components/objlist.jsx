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
      ]
    };
  }
  render() {
    return (
      <div> 
        <h3 className="componentTitle">Objectives</h3>
        <div> 
          There are {this.state.list.length} things I want to do
        </div>
        <div> 
         {this.state.list.map((item, index) =>
            <ObjItem item={item} key={index}/>
          )}
        </div>
      </div>
    );
  }
}

export default ObjList;
