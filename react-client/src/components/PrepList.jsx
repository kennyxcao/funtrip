import React from 'react';
import PrepItem from './PrepItem.jsx';
class PrepList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { 
          id: 1,
          description: 'Passport',
          status: 'unchecked'
        },
        { 
          id: 2,
          description: 'Toothbrush',
          status: 'unchecked'
        },
        { 
          id: 3,
          description: 'Phone',
          status: 'unchecked'
        }
      ]
    };
  }
  render() {
    return (
      <div> 
        <h3 className="componentTitle">Prep List</h3>
        <div> 
          There are {this.state.list.length} items to bring
        </div>
        <div> 
         {this.state.list.map((item, index) =>
            <PrepItem item={item} key={index}/>
          )}
        </div>
      </div>
    );
  }
}

export default PrepList;