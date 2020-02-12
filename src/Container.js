import React from 'react';
import $ from 'jquery';
import './style.css';
// import TicketList from './TicketList.js';

class Container extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data:[],
			example:this.props.data,
		}
		this.fromCheapToExp = this.fromCheapToExp.bind(this);
		this.fromQuicktoLong = this.fromQuicktoLong.bind(this);
		this.scrollRender = this.scrollRender.bind(this);
		this.filter = this.filter.bind(this);
		this.sortFast = this.sortFast.bind(this);
		this.sortCheap = this.sortCheap.bind(this);
	}

	componentDidMount() {
		let list = this.state.example;
    	this.setState({
    		data:list.slice(0,10),
    	})
    }

    scrollRender() {
		let list = this.state.example;
		let n = this.state.data.length;
		let maxScrollTop = ($('#ticket-container')[0].scrollHeight - 1025);
	    if ($('#ticket-container')[0].scrollTop === maxScrollTop) {
	    	n = n + 10;
	    	this.setState({
	    		data:list.slice(0,n),
	   		})
	    }
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

    sortFast(arr) {
    	let mapped = arr.map((number, i) => {
			return { index: i, value: number.segments[0].duration + number.segments[1].duration};
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
		let arr = this.state.example;
		let result = this.sortCheap(arr);
		$('#cheap')[0].classList.add('active');
		$('#speed')[0].classList.remove('active');
		this.setState ({
			data: result.slice(0,this.state.data.length),
			example: result,
		})
	}

	fromQuicktoLong() {
		let arr = this.state.example;
		let result = this.sortFast(arr);
		$('#speed')[0].classList.add('active');
		$('#cheap')[0].classList.remove('active');
		this.setState ({
			data: result.slice(0, this.state.data.length),
			example: result,
		})
	}

	filter() {
		let key = []
		const all = $('#all')[0];
		const without = $('#without')[0];
		const oneStop = $('#oneStop')[0];
		const twoStop = $('#twoStop')[0];
		const threeStop = $('#threeStop')[0];
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
		if (all.checked) {
			without.checked = false;
			oneStop.checked = false;
			twoStop.checked = false;
			threeStop.checked = false;
			this.setState ({
				data: this.props.data.slice(0, this.state.data.length),
			})
		} 
		if (without.checked === false && oneStop.checked === false 
			&& twoStop.checked === false && threeStop.checked === false) {
			all.checked = true;
			this.setState({
				data: this.props.data.slice(0, this.state.data.length),
			})
		} else {
			all.checked = false;
			let mapped = this.props.data.map((number) => {
				if (key.includes(number.stops[0]) && key.includes(number.stops[1])){	
					return number;
				} 
			})
			let result = mapped.filter(number => number !== undefined);
			if ($('#speed')[0].classList.contains('active')) {
				result = this.sortCheap(result);
			} 
			if ($('#cheap')[0].classList.contains('active')) {
				result = this.sortFast(result);
			}
			this.setState({
				data: result.splice(0, this.state.data.length),
				example: result,
			})
		}
	}

	render() {
		console.log(this.state.data);
		function getTimeFromMins(mins, duration) {
			let startHours = +mins.slice(0, 2);
			let startMinutes = +mins.slice(3, 5);
			let allMinutes = startHours*60 + startMinutes + duration
		    let hours = Math.trunc(allMinutes % 1440 / 60);
		    let minutes = allMinutes % 60;
		    if (hours < 10) {
		    	hours = '0' + hours;
		    }
		    if (minutes < 10) {
		    	minutes = '0' + minutes;
		    }
		    return hours + ':' + minutes;
		}
		function getTime(mins) {
		    let hours = Math.trunc(mins / 60);
		    let minutes = mins % 60;
		    if (hours < 10) {
		    	hours = '0' + hours;
		    }
		    if (minutes < 10) {
		    	minutes = '0' + minutes;
		    }
		    return hours + 'h ' + minutes + 'm ';
		};
		function allFromArr(item) {
			let line = '';
			if (item !== undefined) {
				for (var i = 0; i<item.length; i++) {
					line = line + item[i] +  ' ';
				}
			}
			return line;
		}
		const listPrices = this.state.data.map((number, index) => 
			<div key={index} className="ticket">
				<div className="top">
					<p>{number.price + ' P'}</p>
					<p>{number.carrier + ' Airlines'}</p>
				</div>
				<div className="string">
					<div className="item">
						<p className="secondaryText">MOW - HKT</p>
						<p className="primaryText">{number.segments[0].date.slice(11, 16)
					 		+ ' - ' + getTimeFromMins(number.segments[0].date.slice(11, 16),
					  		number.segments[0].duration)}</p>
					</div>
					<div className="item">
						<p className="secondaryText">В пути</p>
						<p className="primaryText">{getTime(number.segments[0].duration)}</p>
					</div>
					<div className="item">
						<p className="secondaryText">Пересадки</p>
						<p className="primaryText">{allFromArr(number.segments[0].stops)}</p>
					</div>
				</div>
				<div className="string">
					<div className="item">
						<p className="secondaryText">HKT - MOW</p>
						<p className="primaryText">{number.segments[1].date.slice(11, 16)
					 		+ ' - ' + getTimeFromMins(number.segments[1].date.slice(11, 16),
					  		number.segments[1].duration)}</p>
					</div>
					<div className="item">
						<p className="secondaryText">В пути</p>
						<p className="primaryText">{getTime(number.segments[1].duration)}</p>
					</div>
					<div className="item">
						<p className="secondaryText">Пересадки</p>
						<p className="primaryText">{allFromArr(number.segments[1].stops)}</p>
					</div>
				</div>
			</div>
		);
		return(
			<div id="container">
				<div id="filter">
					<p>Количество пересадок</p>
					<label className="containerCheck">Все
						<input onChange={this.filter} id="all" type="checkbox"/>
						<span className="checkmark"></span>
					</label>
					<label className="containerCheck">Без пересадок
						<input onChange={this.filter} id="without" type="checkbox" />
						<span className="checkmark"></span>
					</label>
					<label className="containerCheck">1 пересадка
						<input onChange={this.filter} id="oneStop" type="checkbox" />
						<span className="checkmark"></span>
					</label>
					<label className="containerCheck">2 пересадки
						<input onChange={this.filter} id="twoStop" type="checkbox" />
						<span className="checkmark"></span>
					</label>
					<label className="containerCheck">3 пересадки
						<input onChange={this.filter} id="threeStop" type="checkbox" />
						<span className="checkmark"></span>
					</label>
				</div>
				<div id="second-main">
					<div id="tabs">
						<div onClick={this.fromCheapToExp} id="cheap">
							<p>Самый дешевый</p>
						</div>
						<div onClick={this.fromQuicktoLong} id="speed">
							<p>Самый быстрый</p>
						</div>
					</div>
					<div onScroll={this.scrollRender} id="ticket-container">
						{listPrices}
					</div>
				</div>
			</div>
			
		);
	}
}

export default Container;