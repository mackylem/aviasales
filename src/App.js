import React from 'react';
import $ from 'jquery';
import './style.css';
import GetTickets from './GetTickets.js';
import Container from './Container.js';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data:[],
			cheap: false,
			fast: false,
			example:[],
		}
		this.listTickets = this.listTickets.bind(this);
	}

	componentDidMount() {
        this.listTickets();
    }

	listTickets() {
		const getTicket = new GetTickets();

		getTicket.getSearchId().then(v => {
			getTicket.getListTickets(v).then(v => {
				let result = v.map((number) => {
					number.stops = number.segments[0].stops.length + '' + number.segments[1].stops.length;
					return number;
				})
				this.setState({
					data:result,
					example:result,
				})					
			});
		})
	}

	render() {
		if (this.state.data[0]!==undefined){
			return(
				<div className="main">
					<div className="logo-container">
						<i className="icon fas fa-plane-departure"></i>
					</div>
					<Container data={this.state.data} />
				</div>
			); 
		}
		else{
			return(
				<div className="main">
					<div className="logo-container">
						<i className="icon fas fa-plane-departure"></i>
					</div>
				</div>
			); 
		}		
	}
}

export default App;

