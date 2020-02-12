import React from 'react';
// import $ from 'jquery';
import './style.css';
import GetTickets from './GetTickets.js';
import Container from './Container.js';
import TicketList from './TicketList.js';

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
		this.filterAll = this.filterAll.bind(this);
		this.filter = this.filter.bind(this);
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

	sortCheap(arr) {
		let mapped = arr.map((number, i) => {
			return { index: i, value: number.price};
		});
		mapped.sort(function(a, b) {
			return a.value - b.value;
		});	
		let result = mapped.map((number) => {
			return arr[number.index];
		});
		return result;
	}

	fromCheapToExp() {
		let arr = this.state.data;
		let result = this.sortCheap(arr);
		document.getElementsByClassName('cheap')[0].classList.add('active');
		document.getElementsByClassName('speed')[0].classList.remove('active');
		this.setState ({
			data: result,
			cheap: true,
			fast: false,
		})
	}

	sortFast(arr) {
		let mapped = arr.map((number, i) => {
			return { index: i, value: number.segments[0].duration + number.segments[1].duration};
		})
		mapped.sort(function(a, b) {
			return a.value - b.value;
		});	
		let result = mapped.map((number) => {
			return arr[number.index];
		})
		return result;
	}

	fromQuicktoLong() {
		let arr = this.state.data;
		let result = this.sortFast(arr);
		document.getElementsByClassName('speed')[0].classList.add('active');
		document.getElementsByClassName('cheap')[0].classList.remove('active');
		this.setState ({
			data: result,
			cheap: false,
			fast: true,
		})
	}

	filterAll() {
		let example = this.state.example;
		if (this.state.cheap) {
			example = this.sortCheap(example);
		} 
		if (this.state.fast) {
			example = this.sortFast(example);
		}
		const all = document.getElementsByClassName('all')[0];
		const without = document.getElementsByClassName('without')[0];
		const oneStop = document.getElementsByClassName('oneStop')[0];
		const twoStop = document.getElementsByClassName('twoStop')[0];
		const threeStop = document.getElementsByClassName('threeStop')[0];
		if (all.checked) {
			without.checked = false;
			oneStop.checked = false;
			twoStop.checked = false;
			threeStop.checked = false;
			this.setState ({
				data: example,
			})
		}
	}

	filter() {
		let key = []
		const all = document.getElementsByClassName('all')[0];
		const without = document.getElementsByClassName('without')[0];
		const oneStop = document.getElementsByClassName('oneStop')[0];
		const twoStop = document.getElementsByClassName('twoStop')[0];
		const threeStop = document.getElementsByClassName('threeStop')[0];
		if (without.checked) {
			key.push('0');
		}
		if (oneStop.checked) {
			key.push('1');
		}
		if (twoStop.checked) {
			key.push('2');
		}
		if (threeStop.checked) {
			key.push('3');
		}
		if (without.checked === false && oneStop.checked === false 
			&& twoStop.checked === false && threeStop.checked === false) {
			all.checked = true;
			this.setState({
				data: this.state.example,
			})
		} else {
			all.checked = false;
			let mapped = this.state.example.map((number) => {
				if (key.includes(number.stops[0]) && key.includes(number.stops[1])){	
					return number;
				} 
			})
			let result = mapped.filter(number => number !== undefined);
			if (this.state.cheap) {
				result = this.sortCheap(result);
			} 
			if (this.state.fast) {
				result = this.sortFast(result);
			}
			this.setState({
				data: result,
			})
		}
	}

	render() {
		if (this.state.data[0]!==undefined){
			// console.log(this.state);
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

