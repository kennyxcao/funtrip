import React from 'react';

//Line 27 add form functionality 
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
			<nav id = 'sidebar'>
        <div className="sidebar-header">
          <h3> FunTrip</h3>
          <img className = 'userLogo' src='http://www.crazy3dfree.com/uploads/101101/1_155752_1.jpg'/>
          <h4> Welcome</h4>
          <h4> {this.props.userName}</h4>
        </div>

        <ul className="list-unstyled components">
          <li>
          <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"> Your Trips</a>
          <ul className="collapse list-unstyled" id="homeSubmenu">
          {this.props.testData.map((el, index) => <SidebarTrips trip = {el} key = {index}/>)}
        </ul>
        </li>
        <button type="button" className="btn btn-success"> Add New Trip </button>
        </ul>
			</nav>
    );
  }
} 

const SidebarTrips = (props) => (
	<li><a href="#">{props.trip.location}</a></li>
);

export default Sidebar;