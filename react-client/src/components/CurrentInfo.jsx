import React from 'react';

class CurrentInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	render(){
		return(
			<div>
				<h3 className = 'componentTitle'> Current Information </h3>
				<p> Weather Info : its hot </p>
				<p> Currency Info : it's expensive </p>
			</div>
		)
	}
}

export default CurrentInfo;