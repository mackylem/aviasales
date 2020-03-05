import React from 'react';
import './style.css';
import Container from './Container';

class App extends React.Component {
	render() {
		return(
			<div className="main">
				<div className="logo-container">
					<i className="icon fas fa-plane-departure"/>
				</div>
				<Container />
			</div>
		);
	}
}

export default App;

