import React from 'react';
import './style.css';
import Container from './Container';

class App extends React.Component {
	render() {
		// if (this.state.data[0]!==undefined){
			return(
				<div className="main">
					<div className="logo-container">
						<i className="icon fas fa-plane-departure"/>
					</div>
					<Container />
				</div>
			);
		// }
		// else{
		// 	return(
		// 		<div className="main">
		// 			<div className="logo-container">
		// 				<i className="icon fas fa-plane-departure"/>
		// 			</div>
		// 		</div>
		// 	);
		// }
	}
}

export default App;

