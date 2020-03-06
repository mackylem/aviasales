import React from 'react';
import './style.css';
import Tabs from './Tabs'
import GetTickets from "./GetTickets";
import Tickets from "./Tickets";


class Container extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data:[],
			example:[],
		};
		this.scrollRender = this.scrollRender.bind(this);
		// this.filter = this.filter.bind(this);
		// this.filterAll = this.filterAll.bind(this);
		this.sort = this.sort.bind(this);
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
					number.id = number.price + number.carrier;
					return number;
				});
				this.setState({
					data:result.slice(0,10),
					example:result,
				})
			});
		})
	}

    scrollRender(target) {
		let length = this.state.data.length;
		if (target.scrollTop >= (target.scrollTopMax - 10)) {
			length = length + 10;
	    	this.setState({
	    		data:this.state.example.slice(0,length),
	   		})
	    }
    }

    sort(result) {
		this.setState ({
			data: result.slice(0,this.state.data.length),
			example: result,
		})
    }
	//
	// filterAll() {
	// 	let props = this.props.data;
	// 	if ($('#cheap')[0].classList.contains('active')) {
	// 		props = this.sortCheap(props);
	// 	}
	// 	if ($('#speed')[0].classList.contains('active')) {
	// 		props = this.sortFast(props);
	// 	}
	// 	const all = $('#all')[0];
	// 	const without = $('#without')[0];
	// 	const oneStop = $('#oneStop')[0];
	// 	const twoStop = $('#twoStop')[0];
	// 	const threeStop = $('#threeStop')[0];
	// 	if (all.checked) {
	// 		without.checked = false;
	// 		oneStop.checked = false;
	// 		twoStop.checked = false;
	// 		threeStop.checked = false;
	// 		this.setState ({
	// 			data: props.slice(0, this.state.data.length),
	// 		})
	// 	}
	// }
	//
	// filter() {
	// 	let key = []
	// 	const all = $('#all')[0];
	// 	const without = $('#without')[0];
	// 	const oneStop = $('#oneStop')[0];
	// 	const twoStop = $('#twoStop')[0];
	// 	const threeStop = $('#threeStop')[0];
	// 	if (without.checked) {
	// 		key.push('0');
	// 	}
	// 	if (oneStop.checked) {
	// 		key.push('1');
	// 	}
	// 	if (twoStop.checked) {
	// 		key.push('2');
	// 	}
	// 	if (threeStop.checked) {
	// 		key.push('3');
	// 	}
	// 	if (without.checked === false && oneStop.checked === false
	// 		&& twoStop.checked === false && threeStop.checked === false) {
	// 		all.checked = true;
	// 		this.setState({
	// 			data: this.props.data.slice(0, this.state.data.length),
	// 		})
	// 	} else {
	// 		all.checked = false;
	// 		let mapped = this.props.data.map((number) => {
	// 			if (key.includes(number.stops[0]) && key.includes(number.stops[1])){
	// 				return number;
	// 			}
	// 		});
	// 		let result = mapped.filter(number => number !== undefined);
	// 		if ($('#cheap')[0].classList.contains('active')) {
	// 			result = this.sortCheap(result);
	// 		}
	// 		if ($('#speed')[0].classList.contains('active')) {
	// 			result = this.sortFast(result);
	// 		}
	// 		this.setState({
	// 			data: result.splice(0, this.state.data.length),
	// 			example: result,
	// 		})
	// 	}
	// }

	render() {
		console.log(this.state.data);
		const checkmark = <span className="checkmark"/>;
		if (this.state.data[0] !== undefined) {
			return(
				<div id="container">
					<div id="filter">
						<p>Количество пересадок</p>
						<label className="containerCheck">Все
							<input onChange={this.filterAll} id="all" type="checkbox"/>
							{checkmark}
						</label>
						<label className="containerCheck">Без пересадок
							<input onChange={this.filter} id="without" type="checkbox" />
							{checkmark}
						</label>
						<label className="containerCheck">1 пересадка
							<input onChange={this.filter} id="oneStop" type="checkbox" />
							{checkmark}
						</label>
						<label className="containerCheck">2 пересадки
							<input onChange={this.filter} id="twoStop" type="checkbox" />
							{checkmark}
						</label>
						<label className="containerCheck">3 пересадки
							<input onChange={this.filter} id="threeStop" type="checkbox" />
							{checkmark}
						</label>
					</div>
					<div id="second-main">
						<Tabs sort={this.sort} data={this.state.example}/>
						<div onScroll={e => this.scrollRender(e.target)} id="ticket-container">
							{
								this.state.data.map((number) =>
									<Tickets data={number} key={number.id} />
								)
							}
						</div>
					</div>
				</div>
			);
		} else {
			return(
				<div/>
			)
		}

	}
}

export default Container;
