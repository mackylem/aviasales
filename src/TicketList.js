import React from 'react';
// import $ from 'jquery';
import './style.css';

class TicketList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data:[],
		}
	}

	componentDidMount() {
		this.firstRender();
		this.scrollRender();
		
    }

    firstRender() {
    	const list = this.props.data.slice(0,10);
     	this.setState({
    		data:list,
    	})
    }

    scrollRender() {
    	let list = this.props.data;
    	let n = 10;
		document.getElementById('ticket-container').addEventListener('scroll', () => {
			let maxScrollTop = (document.getElementById('ticket-container').scrollHeight - 1025);
		    if (document.getElementById('ticket-container').scrollTop === maxScrollTop) {
		    	n = n + 10;
		    	this.setState({
		    		data:list.slice(0,n),
		   		})
		    }
		});
    }

	render() {
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
		return (
			<div id="ticket-container">
				{listPrices}
			</div>
		);	
	}
}

export default TicketList;